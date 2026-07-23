#!/bin/bash
# =============================================
# QMI Compass - Deploy to Google Cloud Run
# =============================================
# Prerequisites:
#   1. gcloud CLI installed and authenticated
#   2. A GCP project with billing enabled
#   3. Run: gcloud auth login
#   4. Run: gcloud config set project YOUR_PROJECT_ID
#
# Usage:
#   chmod +x deploy/cloud-run.sh
#   ./deploy/cloud-run.sh
# =============================================

set -e

# ---- Configuration ----
PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project 2>/dev/null)}"
REGION="${REGION:-europe-west1}"          # Choose closest to your users (me-central1 for Middle East)
SERVICE_NAME="qmi-compass"
REPO_NAME="qmi-compass-repo"
IMAGE_NAME="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  QMI Compass - Cloud Run Deployment  ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# ---- Step 0: Verify prerequisites ----
echo -e "${YELLOW}[0/7] Verifying prerequisites...${NC}"

if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}Error: No GCP project selected.${NC}"
    echo "Run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "  Project ID: ${PROJECT_ID}"
echo "  Region: ${REGION}"

# Check gcloud
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI not found.${NC}"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker not found.${NC}"
    exit 1
fi

# Check docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}Error: Docker is not running.${NC}"
    exit 1
fi

echo -e "${GREEN}  ✓ Prerequisites verified${NC}"

# ---- Step 1: Enable required APIs ----
echo -e "${YELLOW}[1/7] Enabling required Google Cloud APIs...${NC}"

gcloud services enable \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    secretmanager.googleapis.com \
    --project="${PROJECT_ID}"

echo -e "${GREEN}  ✓ APIs enabled${NC}"

# ---- Step 2: Create Artifact Registry repository ----
echo -e "${YELLOW}[2/7] Setting up Artifact Registry...${NC}"

gcloud artifacts repositories create "${REPO_NAME}" \
    --repository-format=docker \
    --location="${REGION}" \
    --project="${PROJECT_ID}" \
    2>/dev/null || echo "  Repository already exists (that's fine)"

# Configure Docker for Artifact Registry
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet

echo -e "${GREEN}  ✓ Artifact Registry ready${NC}"

# ---- Step 3: Create secrets ----
echo -e "${YELLOW}[3/7] Setting up secrets...${NC}"

# Generate a random AUTH_SECRET if it doesn't exist
if gcloud secrets describe auth-secret --project="${PROJECT_ID}" 2>/dev/null; then
    echo "  auth-secret already exists"
else
    AUTH_SECRET=$(openssl rand -base64 32)
    echo -n "$AUTH_SECRET" | gcloud secrets create auth-secret \
        --data-file=- \
        --project="${PROJECT_ID}"
    echo "  Created auth-secret"
fi

echo -e "${GREEN}  ✓ Secrets configured${NC}"

# ---- Step 4: Build Docker image ----
echo -e "${YELLOW}[4/7] Building Docker image...${NC}"

docker build -t "${IMAGE_NAME}:latest" .

echo -e "${GREEN}  ✓ Image built successfully${NC}"

# ---- Step 5: Push to Artifact Registry ----
echo -e "${YELLOW}[5/7] Pushing image to Artifact Registry...${NC}"

docker push "${IMAGE_NAME}:latest"

echo -e "${GREEN}  ✓ Image pushed${NC}"

# ---- Step 6: Deploy to Cloud Run ----
echo -e "${YELLOW}[6/7] Deploying to Cloud Run...${NC}"

gcloud run deploy "${SERVICE_NAME}" \
    --image="${IMAGE_NAME}:latest" \
    --region="${REGION}" \
    --platform=managed \
    --port=3000 \
    --memory=512Mi \
    --cpu=1 \
    --min-instances=0 \
    --max-instances=10 \
    --set-env-vars="NODE_ENV=production,DATABASE_URL=file:/app/data/qmi.db" \
    --set-secrets="AUTH_SECRET=auth-secret:latest" \
    --allow-unauthenticated \
    --project="${PROJECT_ID}"

echo -e "${GREEN}  ✓ Deployed to Cloud Run${NC}"

# ---- Step 7: Seed the database ----
echo -e "${YELLOW}[7/7] Seeding the database...${NC}"

SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" \
    --region="${REGION}" \
    --format='value(status.url)' \
    --project="${PROJECT_ID}")

# Wait for service to be ready
echo "  Waiting for service to be ready..."
sleep 10

SEED_RESPONSE=$(curl -s -X POST "${SERVICE_URL}/api/seed")
echo "  Seed response: ${SEED_RESPONSE}"

echo -e "${GREEN}  ✓ Database seeded${NC}"

# ---- Done! ----
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Complete! 🎉            ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "  🌐 Your app is live at:"
echo -e "  ${GREEN}${SERVICE_URL}${NC}"
echo ""
echo "  📋 Useful commands:"
echo "    View logs:  gcloud run services logs read ${SERVICE_NAME} --region=${REGION}"
echo "    View config: gcloud run services describe ${SERVICE_NAME} --region=${REGION}"
echo "    Update:     ./deploy/cloud-run.sh  (run again after code changes)"
echo "    Set custom domain: https://cloud.google.com/run/docs/mapping-custom-domains"
echo ""
echo -e "  ${YELLOW}⚠  Important: Cloud Run uses ephemeral storage.${NC}"
echo -e "  ${YELLOW}  Your SQLite database resets on redeployment.${NC}"
echo -e "  For production, consider:${NC}"
echo "    1. Add a Cloud Run volume mount (see deploy/cloud-run-volume.yaml)"
echo "    2. Or migrate to Cloud SQL (PostgreSQL) - see deploy/migrate-to-postgres.md"
echo ""
