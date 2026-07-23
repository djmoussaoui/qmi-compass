#!/bin/bash
# =============================================
# QMI Compass - Compute Engine VM Setup Script
# =============================================
# Run this script on your new GCP VM to set up
# the entire environment from scratch.
#
# Usage:
#   1. Create a VM (see step-by-step guide)
#   2. Copy this script + Dockerfile to the VM
#   3. Run: chmod +x deploy/vm-setup.sh && ./deploy/vm-setup.sh
# =============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  QMI Compass - VM Setup Script     ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# ---- 1. Install Docker ----
echo -e "${YELLOW}[1/6] Installing Docker...${NC}"

# Check if Docker is already installed
if command -v docker &> /dev/null; then
    echo "  Docker already installed"
else
    # Install Docker using convenience script
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh

    # Add current user to docker group
    sudo usermod -aG docker $USER
    echo "  Docker installed. You may need to log out and back in."
fi

# ---- 2. Install Nginx ----
echo -e "${YELLOW}[2/6] Installing Nginx...${NC}"

if command -v nginx &> /dev/null; then
    echo "  Nginx already installed"
else
    sudo apt-get update
    sudo apt-get install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
echo "  Nginx installed"
fi

# ---- 3. Install Certbot (for SSL) ----
echo -e "${YELLOW}[3/6] Installing Certbot...${NC}"

if command -v certbot &> /dev/null; then
    echo "  Certbot already installed"
else
    sudo apt-get install -y certbot python3-certbot-nginx
    echo "  Certbot installed"
fi

# ---- 4. Configure Nginx ----
echo -e "${YELLOW}[4/6] Configuring Nginx...${NC}"

if [ -f "deploy/nginx.conf" ]; then
    # Get the VM's external IP
    EXTERNAL_IP=$(curl -s -H "Metadata-Flavor: Google" \
        http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip 2>/dev/null \
        || echo "YOUR_DOMAIN_OR_IP")

    sudo cp deploy/nginx.conf /etc/nginx/sites-available/qmi-compass
    sudo sed -i "s/your-domain.com/${EXTERNAL_IP}/g" /etc/nginx/sites-available/qmi-compass
    sudo ln -sf /etc/nginx/sites-available/qmi-compass /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t && sudo systemctl reload nginx
    echo "  Nginx configured for ${EXTERNAL_IP}"
else
    echo "  Skipping: deploy/nginx.conf not found"
fi

# ---- 5. Create data directory ----
echo -e "${YELLOW}[5/6] Setting up data directory...${NC}"

mkdir -p /opt/qmi-compass/data

# ---- 6. Build and run ----
echo -e "${YELLOW}[6/6] Building Docker image...${NC}"

if [ -f "Dockerfile" ]; then
    docker build -t qmi-compass:latest .

    # Generate AUTH_SECRET if not set
    export AUTH_SECRET="${AUTH_SECRET:-$(openssl rand -base64 32)}"

    # Run the container
    docker run -d \
        --name qmi-compass \
        --restart unless-stopped \
        -p 3000:3000 \
        -v /opt/qmi-compass/data:/app/data \
        -e NODE_ENV=production \
        -e DATABASE_URL=file:/app/data/qmi.db \
        -e AUTH_SECRET="${AUTH_SECRET}" \
        qmi-compass:latest

    # Wait and seed
    echo "  Waiting for app to start..."
    sleep 10
    curl -s -X POST http://localhost:3000/api/seed
    echo ""

    echo -e "${GREEN}  ✓ Container is running${NC}"
else
    echo "  Skipping: Dockerfile not found. Run this from the project root."
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup Complete! 🎉                 ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "  Your app should be accessible at:"
echo -e "  ${GREEN}http://${EXTERNAL_IP}${NC}"
echo ""
echo "  Next steps:"
echo "  1. Point your domain DNS to this IP"
echo "  2. Run: sudo certbot --nginx -d your-domain.com"
echo "  3. Check logs: docker logs -f qmi-compass"
echo ""
