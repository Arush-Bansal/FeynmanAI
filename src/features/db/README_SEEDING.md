# Database Seeding Scripts

This directory contains scripts for seeding the database with initial data.

## Available Scripts

### 1. Basic Exam Seeding (`seed-exams.ts`)
Seeds the database with basic exam data (JEE, NEET).

**Usage:**
```bash
npm run seed:exams
```

### 2. NEET PG and UPSC Seeding (`seed-neet-pg-upsc.ts`)
Seeds the database with NEET PG and UPSC exams along with their subjects, topics, and subtopics.

**Usage:**
```bash
npm run seed:neet-pg-upsc
```

### 3. JEE and NEET Content Seeding (`seed-jee-neet-content.ts`)
Seeds the database with comprehensive content for JEE and NEET exams including subjects, topics, and subtopics.

**Usage:**
```bash
npm run seed:jee-neet-content
```

### 4. Multi-Level Content Seeding (`seed-multi-level-content.ts`)
Seeds the database with multi-level subtopics (up to 4 levels deep) and concepts for detailed content structure.

**Usage:**
```bash
npm run seed:multi-level-content
```

### 5. Comprehensive Seeding (`seed-all.ts`)
Seeds the database with all exams (JEE, NEET, NEET PG, UPSC) and their complete content structure including multi-level subtopics and concepts.

**Usage:**
```bash
npm run seed:all
```

## What Gets Created

### JEE Exam
- **Subjects:** Physics, Chemistry, Mathematics
- **Topics:** 5 topics per subject (e.g., Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics for Physics)
- **Subtopics:** 5 subtopics per topic (e.g., Kinematics, Dynamics, Work and Energy, Momentum, Gravitation for Mechanics)

### NEET Exam
- **Subjects:** Physics, Chemistry, Biology
- **Topics:** 5 topics per subject (e.g., Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics for Physics)
- **Subtopics:** 5 subtopics per topic (e.g., Kinematics, Dynamics, Work and Energy, Momentum, Gravitation for Mechanics)

### NEET PG Exam
- **Subjects:** Anatomy, Physiology, Biochemistry, Pathology, Pharmacology
- **Topics:** 3 topics per subject (e.g., Gross Anatomy, Histology, Embryology for Anatomy)
- **Subtopics:** 3 subtopics per topic (e.g., Head and Neck, Thorax, Abdomen for Gross Anatomy)

### UPSC Exam
- **Subjects:** General Studies, Indian Polity, Geography, History, Economics
- **Topics:** 3 topics per subject (e.g., Current Affairs, Environment, Science and Technology for General Studies)
- **Subtopics:** 3 subtopics per topic (e.g., National News, International Relations, Government Schemes for Current Affairs)

### Multi-Level Content Structure
- **Level 1:** First-level subtopics (children of topics)
- **Level 2:** Second-level subtopics (children of first-level subtopics)
- **Level 3:** Third-level subtopics (children of second-level subtopics)
- **Level 4:** Fourth-level subtopics (children of third-level subtopics)
- **Concepts:** Detailed learning content with difficulty levels

### Concepts
- **Difficulty Levels:** BEGINNER, INTERMEDIATE, ADVANCED
- **Content:** Key points, detailed explanations, estimated learning time
- **Structure:** Organized under specific subtopics for targeted learning

## Features

- **Idempotent:** Scripts can be run multiple times safely
- **Error Handling:** Gracefully handles duplicate entries
- **Comprehensive Logging:** Shows progress and any errors
- **TypeScript:** Fully typed for better development experience
- **No Duplications:** Each exam has unique content structure with shared subjects where appropriate
- **Multi-Level Structure:** Hierarchical subtopic organization for detailed content
- **Concept Integration:** Detailed learning content with difficulty levels

## Content Structure

### Shared Content
- **Physics:** Shared between JEE and NEET with identical topics and subtopics
- **Chemistry:** Shared between JEE and NEET with identical topics and subtopics
- **Mathematics:** Unique to JEE
- **Biology:** Unique to NEET

### Unique Content
- **NEET PG:** Medical postgraduate content (Anatomy, Physiology, etc.)
- **UPSC:** Civil services content (General Studies, Indian Polity, etc.)

### Multi-Level Examples
- **Mechanics → Kinematics → Linear Motion → Uniform Motion → Concepts**
- **Physical Chemistry → Atomic Structure → Electron Configuration → Concepts**
- **Algebra → Quadratic Equations → Quadratic Formula → Concepts**

## Running the Scripts

1. Make sure your database is running and accessible
2. Ensure your environment variables are set up correctly
3. Run the desired seeding script:

```bash
# For basic exams
npm run seed:exams

# For JEE and NEET content
npm run seed:jee-neet-content

# For NEET PG and UPSC
npm run seed:neet-pg-upsc

# For multi-level content with concepts
npm run seed:multi-level-content

# For all exams (recommended)
npm run seed:all
```

## Notes

- The scripts use the existing database models and data functions
- All content is dummy data suitable for development/testing
- Icons are referenced from the `/public/images/` directory
- The scripts will skip existing entries rather than fail
- **Multi-level subtopics:** Hierarchical structure up to 4 levels deep
- **Concepts:** Detailed learning content with difficulty levels and estimated time
- **Shared subjects:** Physics and Chemistry are shared between JEE and NEET to avoid duplication 