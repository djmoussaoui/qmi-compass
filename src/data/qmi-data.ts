// QMI Compass Static Data
// All data is based on educational research. Qur'anic references marked for review.

export const EDUCATIONAL_LEVELS = [
  { id: 'primary', nameAr: 'المرحلة الابتدائية', nameEn: 'Primary School', icon: '🏫', gradeRange: '1-6' },
  { id: 'middle', nameAr: 'المرحلة المتوسطة', nameEn: 'Middle School', icon: '📚', gradeRange: '7-9' },
  { id: 'secondary', nameAr: 'المرحلة الثانوية', nameEn: 'Secondary School', icon: '🎓', gradeRange: '10-12' },
  { id: 'university', nameAr: 'المرحلة الجامعية', nameEn: 'University', icon: '🏛️', gradeRange: 'undergraduate' },
] as const;

export const SUBJECTS = [
  { id: 'mathematics', nameAr: 'الرياضيات', nameEn: 'Mathematics' },
  { id: 'arabic', nameAr: 'اللغة العربية', nameEn: 'Arabic Language' },
  { id: 'science', nameAr: 'العلوم', nameEn: 'Science' },
  { id: 'islamic_studies', nameAr: 'الدراسات الإسلامية', nameEn: 'Islamic Studies' },
  { id: 'social_studies', nameAr: 'الدراسات الاجتماعية', nameEn: 'Social Studies' },
  { id: 'english', nameAr: 'اللغة الإنجليزية', nameEn: 'English Language' },
  { id: 'computer_science', nameAr: 'علوم الحاسب', nameEn: 'Computer Science' },
  { id: 'physics', nameAr: 'الفيزياء', nameEn: 'Physics' },
  { id: 'chemistry', nameAr: 'الكيمياء', nameEn: 'Chemistry' },
  { id: 'biology', nameAr: 'الأحياء', nameEn: 'Biology' },
  { id: 'art', nameAr: 'الفنون', nameEn: 'Art' },
  { id: 'physical_education', nameAr: 'التربية البدنية', nameEn: 'Physical Education' },
  { id: 'research_methods', nameAr: 'مناهج البحث', nameEn: 'Research Methods' },
  { id: 'professional_ethics', nameAr: 'الأخلاق المهنية', nameEn: 'Professional Ethics' },
] as const;

export const ACTIVITY_TYPES = [
  { id: 'story', nameAr: 'قصة', nameEn: 'Story' },
  { id: 'roleplay', nameAr: 'تمثيل أدوار', nameEn: 'Role-play' },
  { id: 'experiment', nameAr: 'تجربة', nameEn: 'Experiment' },
  { id: 'competition', nameAr: 'مسابقة', nameEn: 'Competition' },
  { id: 'project', nameAr: 'مشروع', nameEn: 'Project' },
  { id: 'debate', nameAr: 'مناظرة', nameEn: 'Debate' },
  { id: 'case_study', nameAr: 'دراسة حالة', nameEn: 'Case Study' },
  { id: 'community_service', nameAr: 'خدمة مجتمعية', nameEn: 'Community Service' },
  { id: 'reflection', nameAr: 'تأمل فردي', nameEn: 'Individual Reflection' },
  { id: 'simulation', nameAr: 'محاكاة مهنية', nameEn: 'Professional Simulation' },
  { id: 'group_problem', nameAr: 'حل مشكلات جماعي', nameEn: 'Group Problem-solving' },
] as const;

export const GROUP_SIZES = [
  { id: 'individual', nameAr: 'فردي', nameEn: 'Individual' },
  { id: 'pairs', nameAr: 'ثنائي', nameEn: 'Pairs' },
  { id: 'small_groups', nameAr: 'مجموعات صغيرة', nameEn: 'Small Groups' },
  { id: 'whole_class', nameAr: 'الصف كامل', nameEn: 'Whole Class' },
] as const;

export const LOCATIONS = [
  { id: 'classroom', nameAr: 'الصف الدراسي', nameEn: 'Classroom' },
  { id: 'laboratory', nameAr: 'المختبر', nameEn: 'Laboratory' },
  { id: 'sports', nameAr: 'الملعب', nameEn: 'Sports Field' },
  { id: 'library', nameAr: 'المكتبة', nameEn: 'Library' },
  { id: 'university', nameAr: 'مرافق جامعية', nameEn: 'University Facility' },
  { id: 'community', nameAr: 'المجتمع', nameEn: 'Community' },
] as const;

export const REVIEW_STATUSES = [
  { id: 'draft', nameAr: 'مسودة', nameEn: 'Draft', color: 'bg-gray-100 text-gray-700' },
  { id: 'educational_review', nameAr: 'مراجعة تربوية', nameEn: 'Educational Review', color: 'bg-amber-100 text-amber-700' },
  { id: 'quranic_review', nameAr: 'مراجعة قرآنية', nameEn: 'Qur\'anic Review', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'approved', nameAr: 'معتمد', nameEn: 'Approved', color: 'bg-green-100 text-green-700' },
  { id: 'revision_required', nameAr: 'يحتاج تعديل', nameEn: 'Revision Required', color: 'bg-orange-100 text-orange-700' },
  { id: 'rejected', nameAr: 'مرفوض', nameEn: 'Rejected', color: 'bg-red-100 text-red-700' },
] as const;

export const PROGRESS_LEVELS = [
  { id: 'emerging', nameAr: 'بادئ', nameEn: 'Emerging', description: 'بدأ إظهار السلوك في سياقات محددة' },
  { id: 'developing', nameAr: 'نامٍّ', nameEn: 'Developing', description: 'يُظهر السلوك بتوجيه متكرر' },
  { id: 'practicing', nameAr: 'ممارس', nameEn: 'Practicing', description: 'يُظهر السلوك بانتظام مع تذكير أحيانًا' },
  { id: 'consistent', nameAr: 'متماسك', nameEn: 'Consistent', description: 'يُظهر السلوك بانتظام في معظم المواقف' },
  { id: 'transferring', nameAr: 'ناقل', nameEn: 'Transferring', description: 'ينقل السلوك تلقائيًا إلى سياقات جديدة' },
] as const;

export const INTERVENTION_TYPES = [
  { id: 'preventive', nameAr: 'وقائي', nameEn: 'Preventive' },
  { id: 'corrective', nameAr: 'تصحيحي', nameEn: 'Corrective' },
  { id: 'developmental', nameAr: 'تنموي', nameEn: 'Developmental' },
] as const;

// Moral Values
export interface MoralValueData {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  behaviors: TargetBehaviorData[];
  progressions: ValueProgressionData[];
}

export interface TargetBehaviorData {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface ValueProgressionData {
  level: string;
  focusAr: string;
  focusEn: string;
  formatsAr: string[];
  observableBehaviorAr: string;
  observableBehaviorEn: string;
}

export const MORAL_VALUES: MoralValueData[] = [
  {
    id: 'patience',
    nameAr: 'الصبر',
    nameEn: 'Patience',
    descriptionAr: 'القدرة على التحمل والمثابرة في مواجهة التحديات دون الاستسلام أو اليأس',
    descriptionEn: 'The ability to endure and persevere in the face of challenges without giving up or despairing',
    icon: '⏳',
    color: 'emerald',
    behaviors: [
      {
        id: 'giving_up',
        nameAr: 'التخلي عند الصعوبة',
        nameEn: 'Giving up when facing difficulty',
        descriptionAr: 'يترك المهمة بعد أول خطأ أو صعوبة',
        descriptionEn: 'Leaves the task after the first mistake or difficulty',
      },
      {
        id: 'despair_after_failure',
        nameAr: 'اليأس بعد الفشل',
        nameEn: 'Despair after failure',
        descriptionAr: 'يفقد الأمل ولا يحاول مرة أخرى بعد فشل سابق',
        descriptionEn: 'Loses hope and does not try again after previous failure',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'ينتظر دوره ويُتم مهامًا قصيرة',
        focusEn: 'Waits for a turn and completes short tasks',
        formatsAr: ['ألعاب', 'قصص', 'تحديات بسيطة'],
        observableBehaviorAr: 'ينتظر دوره بصبر ويُكمل المهمة المطلوبة حتى لو كانت صعبة قليلاً',
        observableBehaviorEn: 'Waits for turn patiently and completes the required task even if slightly difficult',
      },
      {
        level: 'middle',
        focusAr: 'يتحمل الإحباط ويحاول مرة أخرى',
        focusEn: 'Manages frustration and tries again',
        formatsAr: ['سيناريوهات اجتماعية', 'أنشطة رياضية', 'مجلات تأملية'],
        observableBehaviorAr: 'يواجه صعوبة في المهمة ولا يتركها بل يبحث عن طريقة أخرى أو يطلب المساعدة المناسبة',
        observableBehaviorEn: 'Faces difficulty in a task and does not leave it, but seeks another way or appropriate support',
      },
      {
        level: 'secondary',
        focusAr: 'يثابر في المشاريع الطويلة ويتقبل النقد البناء',
        focusEn: 'Perseveres in long projects and receives criticism constructively',
        formatsAr: ['دراسات حالة', 'مشاريع مجتمعية', 'تعلم قائم على المشكلات'],
        observableBehaviorAr: 'يستمر في مشروع طويل المدة ويتعامل مع النقد بشكل بنّاء',
        observableBehaviorEn: 'Continues in a long-term project and deals with criticism constructively',
      },
      {
        level: 'university',
        focusAr: 'يُظهر الصبر في البحث والعمل المهني مع تقبل النتائج غير المتوقعة',
        focusEn: 'Demonstrates patience in research and professional work while accepting unexpected results',
        formatsAr: ['محاكاة مهنية', 'مراجعة أقران', 'تقييم أثر اجتماعي'],
        observableBehaviorAr: 'يتعامل مع نتائج البحث غير المتوقعة بصبر مفتوح ويُعدّل الخطة بدلاً من التخلي عن المشروع',
        observableBehaviorEn: 'Handles unexpected research results with open patience and adjusts the plan instead of abandoning the project',
      },
    ],
  },
  {
    id: 'gratitude',
    nameAr: 'الشكر والعطاء',
    nameEn: 'Gratitude and Giving',
    descriptionAr: 'الاعتراف بالنعم واستخدامها لمساعدة الآخرين ومشاركتها معهم',
    descriptionEn: 'Acknowledging blessings and using them to help and share with others',
    icon: '🙏',
    color: 'amber',
    behaviors: [
      {
        id: 'monopolizing_resources',
        nameAr: 'احتكار الموارد',
        nameEn: 'Withholding or monopolizing resources',
        descriptionAr: 'يحتفظ بالموارد لنفسه ولا يشاركها مع زملائه',
        descriptionEn: 'Keeps resources for themselves and does not share with peers',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'يعتني بالمواد ويشاركها',
        focusEn: 'Cares for and shares materials',
        formatsAr: ['ألعاب تعاونية', 'بطاقات صور', 'مهام مساعدة'],
        observableBehaviorAr: 'يشارك أدواته مع زملائه ويعتني بممتلكات المدرسة',
        observableBehaviorEn: 'Shares their tools with peers and takes care of school property',
      },
      {
        level: 'middle',
        focusAr: 'يستخدم قدرته الشخصية لمساعدة زميل',
        focusEn: 'Uses a personal ability to help a classmate',
        formatsAr: ['أنشطة فريق', 'وساطة أقران', 'دورات قيادة'],
        observableBehaviorAr: 'يُقدّم مساعدة طوعية لزميل يواجه صعوبة باستخدام مهارة يتميز فيها',
        observableBehaviorEn: 'Voluntarily offers help to a struggling classmate using a skill they excel in',
      },
      {
        level: 'secondary',
        focusAr: 'يستخدم مواهبه لدعم مشروع جماعي مفيد',
        focusEn: 'Uses talent to support a useful group project',
        formatsAr: ['مشاريع مجتمعية', 'تعلم بالخدمة', 'قيادة دوارة'],
        observableBehaviorAr: 'يساهم بمواهبه في مشروع يفيد المجتمع المدرسي أو المحلي',
        observableBehaviorEn: 'Contributes their talents to a project benefiting the school or local community',
      },
      {
        level: 'university',
        focusAr: 'يستخدم المعرفة الأكاديمية والخبرة المهنية لخدمة المجتمع',
        focusEn: 'Uses academic knowledge and professional expertise to serve society',
        formatsAr: ['تعلم بالخدمة', 'تقييم أثر اجتماعي', 'ميثاق أخلاق مهني'],
        observableBehaviorAr: 'يُوظّف تخصصه في خدمة قضايا مجتمعية محددة',
        observableBehaviorEn: 'Applies their specialization to serve specific community issues',
      },
    ],
  },
  {
    id: 'humility',
    nameAr: 'التواضع',
    nameEn: 'Humility',
    descriptionAr: 'الاعتراف بالأخطاء وتقدير الآخرين وعدم استخدام النجاح للإساءة',
    descriptionEn: 'Acknowledging mistakes, valuing others, and not using success to belittle',
    icon: '🌱',
    color: 'teal',
    behaviors: [
      {
        id: 'refusing_admit_mistake',
        nameAr: 'رفض الاعتراف بالخطأ',
        nameEn: 'Refusal to admit a mistake',
        descriptionAr: 'لا يعترف بالخطأ حتى مع وجود أدلة واضحة',
        descriptionEn: 'Does not acknowledge a mistake even with clear evidence',
      },
      {
        id: 'pride',
        nameAr: 'الكبر والشعور بالتفوق',
        nameEn: 'Pride and superiority',
        descriptionAr: 'يستخدم نجاحه للسخرية من الآخرين أو التقليل منهم',
        descriptionEn: 'Uses success to mock or belittle others',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'يعتذر ويتجنب السخرية',
        focusEn: 'Apologizes and avoids ridicule',
        formatsAr: ['قصص', 'تمثيل أدوار', 'بطاقات سلوكية'],
        observableBehaviorAr: 'يُقدّم اعتذارًا عند الخطأ ولا يسخر من نجاح الآخرين',
        observableBehaviorEn: 'Apologizes when wrong and does not mock others\' success',
      },
      {
        level: 'middle',
        focusAr: 'يعترف بالخطأ ويقبل الأدلة الأقوى',
        focusEn: 'Admits mistakes and accepts stronger evidence',
        formatsAr: ['مناظرات', 'سجلات تأملية', 'وساطة أقران'],
        observableBehaviorAr: 'يعترف بالخطأ عند ظهور دليل أقوى ويُعدّل موقفه',
        observableBehaviorEn: 'Acknowledges error when stronger evidence appears and adjusts position',
      },
      {
        level: 'secondary',
        focusAr: 'يُظهر التواضع الفكري ويتقبل النقد',
        focusEn: 'Shows intellectual humility and accepts criticism',
        formatsAr: ['مناظرات', 'دراسات حالة', 'تعلم قائم على المشكلات'],
        observableBehaviorAr: 'يستمع لآراء مخالفة ويُعدّل رأيه بناءً على الأدلة',
        observableBehaviorEn: 'Listens to opposing views and adjusts opinion based on evidence',
      },
      {
        level: 'university',
        focusAr: 'يُمارس التواضع العلمي ويقبل النتائج غير المتوقعة',
        focusEn: 'Practices scientific humility and accepts unexpected results',
        formatsAr: ['مراجعة أقران', 'مراجعة أخلاقية للبحث', 'محاكاة مهنية'],
        observableBehaviorAr: 'يُقر بحدود معرفته ويقبل نتائج البحث المخالفة لتوقعه',
        observableBehaviorEn: 'Acknowledges limits of knowledge and accepts research results contrary to expectations',
      },
    ],
  },
  {
    id: 'integrity',
    nameAr: 'الأمانة والنزاهة',
    nameEn: 'Honesty and Integrity',
    descriptionAr: 'التسجيل الدقيق للنتائج والاعتراف بالقيود والأخطاء',
    descriptionEn: 'Accurate recording of results and acknowledgment of limitations and errors',
    icon: '⚖️',
    color: 'rose',
    behaviors: [
      {
        id: 'cheating',
        nameAr: 'الغش أو تزوير الأدلة',
        nameEn: 'Cheating or altering evidence',
        descriptionAr: 'يُسجّل نتائج غير صحيحة أو يُغيّر الإجابات لتطابق المطلوب',
        descriptionEn: 'Records incorrect results or changes answers to match expected ones',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'يخبر الحقيقة ويحترم ممتلكات الآخرين',
        focusEn: 'Tells the truth and respects others\' property',
        formatsAr: ['قصص', 'ألعاب', 'تمثيل أدوار'],
        observableBehaviorAr: 'يخبر الحقيقة حتى لو أخطأ ولا يأخذ ممتلكات غيره',
        observableBehaviorEn: 'Tells the truth even when wrong and does not take others\' property',
      },
      {
        level: 'middle',
        focusAr: 'يُسجّل عمله بدقة ولا ينسخ إجابات الآخرين',
        focusEn: 'Records their work accurately and does not copy others\' answers',
        formatsAr: ['تجارب علمية', 'سيناريوهات أخلاقية', 'سجلات تأملية'],
        observableBehaviorAr: 'يُسجّل نتائجه كما هي حتى لو كانت خاطئة ويذكر المصدر عند الاقتباس',
        observableBehaviorEn: 'Records results as they are even if wrong and cites sources when quoting',
      },
      {
        level: 'secondary',
        focusAr: 'يتجنب الانتحال ويسند الأفكار لأصحابها',
        focusEn: 'Avoids plagiarism and attributes ideas to their owners',
        formatsAr: ['مناظرات', 'دراسات حالة', 'مشاريع بحثية'],
        observableBehaviorAr: 'يُسند الاقتباسات لمصادرها ويتجنب الانتحال في الأعمال المدرسية',
        observableBehaviorEn: 'Attributes quotes to sources and avoids plagiarism in schoolwork',
      },
      {
        level: 'university',
        focusAr: 'يُمارس سلامة البحث والنزاهة الأكاديمية',
        focusEn: 'Practices research integrity and academic honesty',
        formatsAr: ['مراجعة أخلاقية للبحث', 'محاكاة مهنية', 'ميثاق أخلاق مهني'],
        observableBehaviorAr: 'يلتزم بمعايير النزاهة في البحث ويُفصح عن تضارب المصالح',
        observableBehaviorEn: 'Adheres to research integrity standards and discloses conflicts of interest',
      },
    ],
  },
  {
    id: 'fairness',
    nameAr: 'الإنصاف',
    nameEn: 'Fairness',
    descriptionAr: 'التعامل بعدل وتجنب التحيز والاعتراف بالأدلة الأقوى',
    descriptionEn: 'Treating justly, avoiding bias, and acknowledging stronger evidence',
    icon: '⚖️',
    color: 'violet',
    behaviors: [
      {
        id: 'haste',
        nameAr: 'الاستعجال واتخاذ قرارات متهورة',
        nameEn: 'Haste and impulsive decisions',
        descriptionAr: 'يتخذ قرارات دون التحقق من المعلومات',
        descriptionEn: 'Makes decisions without verifying information',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'يحترم قواعد اللعبة ويقبل النتائج',
        focusEn: 'Respects game rules and accepts results',
        formatsAr: ['ألعاب جماعية', 'تمثيل أدوار', 'بطاقات صور'],
        observableBehaviorAr: 'يلتزم بقواعد النشاط ويقبل الخسارة بهدوء',
        observableBehaviorEn: 'Follows activity rules and accepts loss calmly',
      },
      {
        level: 'middle',
        focusAr: 'يتحقق من المعلومات قبل التصرف',
        focusEn: 'Verifies information before acting',
        formatsAr: ['سيناريوهات اجتماعية', 'حل مشكلات جماعي', 'وساطة أقران'],
        observableBehaviorAr: 'لا يُنشر معلومة دون التحقق من صحتها',
        observableBehaviorEn: 'Does not share information without verifying its accuracy',
      },
      {
        level: 'secondary',
        focusAr: 'يُمارس الإنصاف في الحوار ويُحل النزاعات بعدالة',
        focusEn: 'Practices fairness in dialogue and resolves conflicts justly',
        formatsAr: ['مناظرات', 'دراسات حالة', 'اتخاذ قرارات أخلاقية'],
        observableBehaviorAr: 'يستمع لجميع الأطراف ويُصدر أحكامًا مبنية على الأدلة',
        observableBehaviorEn: 'Listens to all parties and makes judgments based on evidence',
      },
      {
        level: 'university',
        focusAr: 'يُمارس الإنصاف في البحث ويُعلن عن تضارب المصالح',
        focusEn: 'Practices fairness in research and declares conflicts of interest',
        formatsAr: ['مراجعة أقران', 'محاكاة مهنية', 'ميثاق أخلاق مهني'],
        observableBehaviorAr: 'يُعلن عن أي تضارب مصالح ويُراجع العمل بأمانة',
        observableBehaviorEn: 'Declares any conflicts of interest and reviews work honestly',
      },
    ],
  },
  {
    id: 'verification',
    nameAr: 'التحقق والمسؤولية',
    nameEn: 'Verification and Responsibility',
    descriptionAr: 'التحقق من المصادر قبل مشاركة المعلومات وتحمّل مسؤولية الدقة',
    descriptionEn: 'Checking sources before sharing information and taking responsibility for accuracy',
    icon: '🔍',
    color: 'cyan',
    behaviors: [
      {
        id: 'sharing_unverified',
        nameAr: 'مشاركة معلومات دون تحقق',
        nameEn: 'Sharing information without verification',
        descriptionAr: 'يُنشر أو يُشارك معلومات دون التأكد من صحتها',
        descriptionEn: 'Publishes or shares information without confirming its accuracy',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'يتأكد قبل أن يقول شيئًا عن زملائه',
        focusEn: 'Makes sure before saying something about peers',
        formatsAr: ['قصص', 'ألعاب', 'بطاقات سلوكية'],
        observableBehaviorAr: 'يسأل المعلم قبل أن يشتكي من زميله',
        observableBehaviorEn: 'Asks the teacher before complaining about a classmate',
      },
      {
        level: 'middle',
        focusAr: 'يتحقق من صحة المعلومات قبل نشرها',
        focusEn: 'Verifies the accuracy of information before sharing',
        formatsAr: ['سيناريوهات اجتماعية', 'أنشطة بحثية بسيطة', 'سجلات تأملية'],
        observableBehaviorAr: 'يفحص المصدر قبل مشاركة خبر أو معلومة',
        observableBehaviorEn: 'Checks the source before sharing news or information',
      },
      {
        level: 'secondary',
        focusAr: 'يُقيّم مصداقية المصادر ويُميّز بين الرأي والحقيقة',
        focusEn: 'Evaluates source credibility and distinguishes opinion from fact',
        formatsAr: ['دراسات حالة', 'مناظرات', 'مشاريع بحثية'],
        observableBehaviorAr: 'يستخدم معايير واضحة لتقييم المصادر ويُفرّق بين الحقائق والآراء',
        observableBehaviorEn: 'Uses clear criteria to evaluate sources and distinguishes facts from opinions',
      },
      {
        level: 'university',
        focusAr: 'يُمارس التحقق العلمي ويُراجع الأدبيات بدقة',
        focusEn: 'Practices scientific verification and reviews literature carefully',
        formatsAr: ['مراجعة أقران', 'مراجعة أخلاقية للبحث', 'تعلم بالخدمة'],
        observableBehaviorAr: 'يُراجع الأدبيات بشكل منهجي ويُتحقق من صحة البيانات',
        observableBehaviorEn: 'Reviews literature systematically and verifies data accuracy',
      },
    ],
  },
  {
    id: 'cooperation',
    nameAr: 'التعاون والكرم',
    nameEn: 'Cooperation and Generosity',
    descriptionAr: 'مراعاة احتياجات المجموعة ومشاركة الموارد والفرص',
    descriptionEn: 'Considering group needs and sharing resources and opportunities',
    icon: '🤝',
    color: 'orange',
    behaviors: [
      {
        id: 'self_centered',
        nameAr: 'السلوك الفردي في المجموعة',
        nameEn: 'Self-centered group behavior',
        descriptionAr: 'يعمل لصالحه فقط ويتجاهل احتياجات المجموعة',
        descriptionEn: 'Works only for personal benefit and ignores group needs',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'يساعد زملاءه ويُكمل المهام الجماعية',
        focusEn: 'Helps classmates and completes group tasks',
        formatsAr: ['ألعاب تعاونية', 'مهام جماعية', 'تمثيل أدوار'],
        observableBehaviorAr: 'يُساهم في العمل الجماعي ويُساعد زميلًا يواجه صعوبة',
        observableBehaviorEn: 'Contributes to group work and helps a struggling classmate',
      },
      {
        level: 'middle',
        focusAr: 'يتعاون حتى في المنافسة ويدعم الزملاء الضعفاء',
        focusEn: 'Cooperates even in competition and supports struggling peers',
        formatsAr: ['أنشطة فريق', 'رياضة', 'وساطة أقران'],
        observableBehaviorAr: 'يدعم زميله حتى في المواقف التنافسية ويُقدّم المساعدة طوعيًا',
        observableBehaviorEn: 'Supports peers even in competitive situations and offers help voluntarily',
      },
      {
        level: 'secondary',
        focusAr: 'يقود بالخدمة ويساهم في مشاريع مجتمعية',
        focusEn: 'Leads by serving and contributes to community projects',
        formatsAr: ['مشاريع مجتمعية', 'تعلم بالخدمة', 'قيادة دوارة'],
        observableBehaviorAr: 'يتولى أدوارًا قيادية لخدمة الفريق لا للسيطرة عليه',
        observableBehaviorEn: 'Takes on leadership roles to serve the team, not to control it',
      },
      {
        level: 'university',
        focusAr: 'يُساهم في العمل الجماعي البحثي ويدعم زملاءه الأكاديميين',
        focusEn: 'Contributes to collaborative research and supports academic peers',
        formatsAr: ['مراجعة أقران', 'مشاريع بحثية جماعية', 'تعلم بالخدمة'],
        observableBehaviorAr: 'يُساهم بإنصاف في الأبحاث الجماعية ويُراجع أعمال زملائه بصدق',
        observableBehaviorEn: 'Contributes fairly to collaborative research and honestly reviews peers\' work',
      },
    ],
  },
  {
    id: 'responsibility',
    nameAr: 'المسؤولية والقيادة الخادمة',
    nameEn: 'Responsibility and Servant Leadership',
    descriptionAr: 'استخدام السلطة لخدمة المجموعة وتمكينها',
    descriptionEn: 'Using authority to serve and enable the group',
    icon: '🛡️',
    color: 'slate',
    behaviors: [
      {
        id: 'misuse_authority',
        nameAr: 'سوء استخدام السلطة',
        nameEn: 'Misuse of authority',
        descriptionAr: 'يستخدم منصبه للسيطرة على الآخرين أو منع مبادراتهم',
        descriptionEn: 'Uses position to control others or block their initiatives',
      },
      {
        id: 'obstructing_initiatives',
        nameAr: 'عرقلة المبادرات المفيدة',
        nameEn: 'Obstructing beneficial initiatives',
        descriptionAr: 'يعرّض مشاريع أو مبادرات مفيدة للفشل',
        descriptionEn: 'Causes useful projects or initiatives to fail',
      },
    ],
    progressions: [
      {
        level: 'primary',
        focusAr: 'يُتم المهام المسندة إليه ويعتني بممتلكات المدرسة',
        focusEn: 'Completes assigned tasks and cares for school property',
        formatsAr: ['مهام بسيطة', 'أدوار دوارة', 'بطاقات سلوكية'],
        observableBehaviorAr: 'يُكمل مهمته في الوقت المحدد ويعتني بالأدوات المشتركة',
        observableBehaviorEn: 'Completes their task on time and takes care of shared tools',
      },
      {
        level: 'middle',
        focusAr: 'يتحمل مسؤولية قراراته ويساعد في حل المشكلات',
        focusEn: 'Takes responsibility for decisions and helps solve problems',
        formatsAr: ['سيناريوهات اجتماعية', 'حل مشكلات جماعي', 'أدوار قيادية'],
        observableBehaviorAr: 'يعترف بمسؤوليته عن نتائج قراراته ويُساهم في حل المشكلات الجماعية',
        observableBehaviorEn: 'Acknowledges responsibility for decision outcomes and contributes to solving group problems',
      },
      {
        level: 'secondary',
        focusAr: 'يقود بالمسؤولية ويدعم المبادرات المفيدة',
        focusEn: 'Leads responsibly and supports beneficial initiatives',
        formatsAr: ['مشاريع مجتمعية', 'اتخاذ قرارات أخلاقية', 'قيادة دوارة'],
        observableBehaviorAr: 'يستخدم دوره القيادي لتمكين الآخرين ويدعم المبادرات المفيدة',
        observableBehaviorEn: 'Uses leadership role to empower others and supports beneficial initiatives',
      },
      {
        level: 'university',
        focusAr: 'يُمارس المسؤولية المهنية ويخدم المجتمع بتخصصه',
        focusEn: 'Practices professional responsibility and serves society through specialization',
        formatsAr: ['محاكاة مهنية', 'تعلم بالخدمة', 'ميثاق أخلاق مهني'],
        observableBehaviorAr: 'يستخدم خبرته لخدمة المجتمع ويتجنب إساءة استخدام السلطة المهنية',
        observableBehaviorEn: 'Uses expertise to serve society and avoids professional power misuse',
      },
    ],
  },
];

// Behavioral safety check - forbidden labels
export const FORBIDDEN_LABELS = [
  'طالب أناني', 'طالب متكبر', 'طالب سيء', 'طالب غير أمين',
  'طالب منافق', 'طالب غير متدين', 'طالب ضعيف أخلاقياً',
  'selfish student', 'arrogant student', 'bad student', 'dishonest student',
  'hypocritical student', 'unreligious student', 'morally weak student',
];

export const BEHAVIOR_WARNING_AR = 'يرجى وصف السلوك المحدد الذي تمت ملاحظته في هذا الموقف، بدلاً من إصدار حكم عام على شخصية الطالب.';
export const BEHAVIOR_WARNING_EN = 'Please describe the specific behavior observed in this situation instead of making a general judgment about the student\'s personality.';

export const AI_DISCLAIMER_AR = 'مسودة مولدة بمساعدة الذكاء الاصطناعي، وتحتاج إلى مراجعة تربوية وعلمية بشرية.';
export const AI_DISCLAIMER_EN = 'AI-assisted draft. Human educational and scientific review is required.';

export const QURANIC_PENDING_AR = 'يضاف المرجع القرآني بعد المراجعة العلمية';
export const QURANIC_PENDING_EN = 'Qur\'anic reference to be added after scientific review.';

// Development Cycle
export const DEVELOPMENT_CYCLE = [
  { id: 'diagnosis', nameAr: 'التشخيص', nameEn: 'Diagnosis', icon: '🔍' },
  { id: 'alternative_value', nameAr: 'القيمة البديلة', nameEn: 'Alternative Value', icon: '💎' },
  { id: 'educational_situation', nameAr: 'الموقف التعليمي', nameEn: 'Educational Situation', icon: '📋' },
  { id: 'observation', nameAr: 'الملاحظة', nameEn: 'Observation', icon: '👁️' },
  { id: 'reflection', nameAr: 'التأمل والمراجعة', nameEn: 'Reflection', icon: '💭' },
  { id: 'alternative_practice', nameAr: 'ممارسة السلوك البديل', nameEn: 'Alternative Practice', icon: '🔄' },
  { id: 'repetition', nameAr: 'التكرار والتغذية الراجعة', nameEn: 'Repetition and Feedback', icon: '🔁' },
  { id: 'transfer', nameAr: 'نقل القيمة إلى الحياة اليومية', nameEn: 'Transfer to Daily Life', icon: '🌍' },
];

// Safeguards
export const SAFEGUARDS = [
  { id: 'observable', nameAr: 'نُقيّم السلوك الملاحظ لا النوايا', nameEn: 'We assess observable behavior, not intentions.', icon: '👁️' },
  { id: 'no_ranking', nameAr: 'لا نُصنّف الطلاب أخلاقياً', nameEn: 'We do not morally rank students.', icon: '🚫' },
  { id: 'no_labeling', nameAr: 'لا نُلصق تسميات بشخصية الطالب', nameEn: 'We do not label student personalities.', icon: '🏷️' },
  { id: 'scientific_review', nameAr: 'المراجع القرآنية تحتاج مراجعة علمية', nameEn: 'Qur\'anic references require scientific review.', icon: '📖' },
  { id: 'human_review', nameAr: 'الأنشطة المولدة بالذكاء الاصطناعي تحتاج مراجعة بشرية', nameEn: 'AI-generated activities require human review.', icon: '🤖' },
];

// Demo user
export const DEMO_TEACHER = {
  id: 'demo-teacher-1',
  nameAr: 'أحمد محمد الخالدي',
  nameEn: 'Ahmed Mohammed Al-Khalidi',
  email: 'ahmed@demo.qmi.edu',
  role: 'teacher' as UserRole,
  institutionId: 'demo-institution-1',
};

export const DEMO_CLASSES = [
  { id: 'demo-class-1', nameAr: 'الصف الثامن - أ', nameEn: 'Grade 8 - A', educationalLevel: 'middle', studentCount: 28 },
  { id: 'demo-class-2', nameAr: 'الصف السابع - ب', nameEn: 'Grade 7 - B', educationalLevel: 'middle', studentCount: 25 },
  { id: 'demo-class-3', nameAr: 'الصف العاشر - أ', nameEn: 'Grade 10 - A', educationalLevel: 'secondary', studentCount: 30 },
];

export const DEMO_STUDENTS = [
  { id: 'demo-student-1', identifier: 'طالب/001', classId: 'demo-class-1' },
  { id: 'demo-student-2', identifier: 'طالب/002', classId: 'demo-class-1' },
  { id: 'demo-student-3', identifier: 'طالب/003', classId: 'demo-class-1' },
  { id: 'demo-student-4', identifier: 'طالب/004', classId: 'demo-class-2' },
  { id: 'demo-student-5', identifier: 'طالب/005', classId: 'demo-class-2' },
  { id: 'demo-student-6', identifier: 'طالب/006', classId: 'demo-class-3' },
];