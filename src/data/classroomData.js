// Course content database for classroom view (lectures, video links, readings, quizzes)
export const classroomData = {
  0: {
    title: "Introduction to Trauma-Informed Care",
    syllabus: [
      {
        title: "Week 1: Understanding Trauma Foundations",
        items: [
          { 
            id: "v1", 
            title: "1.1 Welcome & Course Overview", 
            type: "video", 
            duration: "12 mins", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
            content: "Welcome to the Introduction to Trauma-Informed Care. In this module, we will explore the overall course structure, set clear learning expectations, and introduce the foundational frameworks for trauma recovery counseling." 
          },
          { 
            id: "v2", 
            title: "1.2 Neurological Impact of Trauma", 
            type: "video", 
            duration: "18 mins", 
            videoUrl: "https://www.w3schools.com/html/movie.mp4", 
            content: "In this session, we analyze how traumatic events affect brain development. We will focus specifically on the hyperactive response of the amygdala, the reduction in prefrontal cortex gray matter, and how this affects self-regulation." 
          },
          { 
            id: "r1", 
            title: "1.3 Reading: The ACEs Study Explained", 
            type: "reading", 
            duration: "15 mins read", 
            content: "The Adverse Childhood Experiences (ACE) Study is a landmark investigation showing a clear link between early childhood adversity and long-term physical/mental health issues. Read through this compiled research paper summary to understand how scoring works and how it shapes community-based care models." 
          },
          { 
            id: "q1", 
            title: "1.4 Week 1 Knowledge Check", 
            type: "quiz", 
            questions: [
              { 
                question: "Which brain structure acts as the emotional 'alarm system' and becomes hyperactive following severe trauma?", 
                options: ["Prefrontal Cortex", "Amygdala", "Hippocampus", "Cerebellum"], 
                answer: 1 
              }
            ]
          }
        ]
      },
      {
        title: "Week 2: Core Principles of Care",
        items: [
          { 
            id: "v3", 
            title: "2.1 Safety and Trustworthiness", 
            type: "video", 
            duration: "15 mins", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
            content: "Physical and emotional safety is the starting point of recovery. Learn how to establish clean structural boundaries, maintain transparency, and avoid clinical re-traumatization of participants." 
          },
          { 
            id: "v4", 
            title: "2.2 Peer Support & Collaboration", 
            type: "video", 
            duration: "14 mins", 
            videoUrl: "https://www.w3schools.com/html/movie.mp4", 
            content: "Explore the value of mutuality and peer recovery networks. By promoting shared-governance models, recovery facilitators can assist in breaking down hierarchical barriers." 
          },
          { 
            id: "r2", 
            title: "2.3 Reference: Core Principles Checklist", 
            type: "reading", 
            duration: "10 mins read", 
            content: "Review this self-assessment guide designed to measure compliance with the 6 core tenets of Trauma-Informed Care inside community recovery facilities." 
          }
        ]
      },
      {
        title: "Week 3: Clinical & Faith-Based Frameworks",
        items: [
          { 
            id: "v5", 
            title: "3.1 Clinical Methodology: Cognitive Restructuring", 
            type: "video", 
            duration: "22 mins", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
            content: "A detailed breakdown of cognitive behavioral interventions. Learn how to help students recognize negative automatic thoughts and reconstruct cognitive narratives safely." 
          },
          { 
            id: "v6", 
            title: "3.2 Faith-Based Pastoral Integration", 
            type: "video", 
            duration: "20 mins", 
            videoUrl: "https://www.w3schools.com/html/movie.mp4", 
            content: "Integrating clinical psychology frameworks with theological healing practices. We address forgiveness protocols, spiritual trauma, and recovery integration." 
          }
        ]
      },
      {
        title: "Week 4: Self-Care and Boundary Management",
        items: [
          { 
            id: "v7", 
            title: "4.1 Compassion Fatigue & Burnout", 
            type: "video", 
            duration: "15 mins", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
            content: "Understand secondary traumatic stress and learn how to identify warning indicators of professional burnout and emotional fatigue in your team." 
          },
          { 
            id: "r3", 
            title: "4.2 Article: Setting Personal Boundaries", 
            type: "reading", 
            duration: "20 mins read", 
            content: "As a recovery coach or facilitator, maintaining emotional boundaries is critical. Learn practical decompression techniques and structured debriefing exercises." 
          }
        ]
      }
    ]
  },
  1: {
    title: "Stewardship Keys and Financial Intelligence",
    syllabus: [
      {
        title: "Week 1: Fundamentals of Stewardship",
        items: [
          { 
            id: "v1", 
            title: "1.1 Introduction to Financial Stewardship", 
            type: "video", 
            duration: "15 mins", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
            content: "This module covers the core philosophical and ethical foundations of resource management, accountability, and organizational governance." 
          },
          { 
            id: "v2", 
            title: "1.2 The Concept of Resource Governance", 
            type: "video", 
            duration: "18 mins", 
            videoUrl: "https://www.w3schools.com/html/movie.mp4", 
            content: "Explore organizational governance structures. We look at compliance, resource distribution rules, and leadership oversight guidelines." 
          },
          { 
            id: "q1", 
            title: "1.3 Week 1 Quiz: Principles of Governance", 
            type: "quiz", 
            questions: [
              { 
                question: "What is the primary objective of organizational resource governance?", 
                options: ["Short-term expenditure maximization", "Long-term sustainability, compliance, and ethical stewardship", "Avoiding administrative audits", "Eliminating overhead expenses entirely"], 
                answer: 1 
              }
            ]
          }
        ]
      },
      {
        title: "Week 2: Budgeting and Formulation",
        items: [
          { 
            id: "v3", 
            title: "2.1 Designing a Kingdom Budget", 
            type: "video", 
            duration: "22 mins", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
            content: "A comprehensive guide to constructing and projecting budgets for social enterprises and non-profits." 
          },
          { 
            id: "v4", 
            title: "2.2 Cashflow Forecasts & Accounting", 
            type: "video", 
            duration: "20 mins", 
            videoUrl: "https://www.w3schools.com/html/movie.mp4", 
            content: "Learn standard accounting basics, including tracking monthly operational cashflows, capital reserves, and non-profit statement analysis." 
          }
        ]
      }
    ]
  }
};
