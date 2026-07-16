import React, { useState } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css"; // Essential style sheet for Puck UI
import { config } from "./puck.config"; // Path to the file in the same directory

// Where your page configuration starts when you load the page.
export const initialData = {
  content: [
    {
      type: "Navbar",
      props: {
        id: "Navbar-1",
        logoText: "Mirror School of Transformation",
        signInText: "Sign in",
        registerText: "Register"
      }
    },
    {
      type: "Hero",
      props: {
        id: "Hero-1",
        title: "Reflecting Your Truest Nature",
        subtitle: "We envision a world where individuals live from their authentic God-designed identity and express their highest potential in every area of life.",
        buttonText: "Explore courses",
        buttonUrl: "/courses",
        imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    },
    {
      type: "Partners",
      props: {
        id: "Partners-1",
        title: "Trusted by top universities and organizations"
      }
    },
    {
      type: "Subjects",
      props: {
        id: "Subjects-1",
        badge: "Explore Our Faculties",
        faculties: [
          {
            title: "School of Personal Transformation",
            description: "Discover how to align with your authentic, God-designed identity and express your highest potential. This faculty offers transformative courses designed for deep personal growth, self-discovery, and professional train-the-trainer development.",
            exploreUrl: "/faculties/personal-transformation",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "Students collaborating in a workshop"
          },
          {
            title: "School of Healing",
            description: "Equipping leaders and professionals in addiction recovery, trauma-informed care, and pastoral counseling. Learn clinical and faith-based counseling methodologies to help bring restoration, recovery, and wholeness to families and communities.",
            exploreUrl: "/faculties/healing",
            image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "Supportive counseling session"
          },
          {
            title: "School of Finance and Administration",
            description: "Empowering you with stewardship keys, administrative excellence, and financial intelligence. Gain practical tools to manage, govern, and scale organizations, projects, and resources effectively to maximize kingdom and community impact.",
            exploreUrl: "/faculties/finance-admin",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "Financial strategy session"
          }
        ]
      }
    },
    {
      type: "CourseGrid",
      props: {
        id: "CourseGrid-1",
        title: "Top courses to build your skills",
        buttonText: "View all courses",
        buttonUrl: "/courses",
        courses: [
          {
            type: 'Short course',
            title: 'Introduction to Trauma-Informed Care',
            university: 'The Mirror School Academy',
            duration: '4 weeks',
            image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            type: 'Certificate',
            title: 'Addiction Recovery: Train the Trainer',
            university: 'The Mirror School Academy',
            duration: '8 weeks',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            type: 'Short course',
            title: 'Foundations of Peer Support',
            university: 'The Mirror School Academy',
            duration: '6 weeks',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            type: 'Microcredential',
            title: 'Advanced Counseling Techniques',
            university: 'The Mirror School Academy',
            duration: '10 weeks',
            image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          }
        ]
      }
    },
    {
      type: "Testimonials",
      props: {
        id: "Testimonials-1",
        title: "What Our Learners Say",
        subtitle: "Stories of transformation, restoration, and growth from our global community",
        testimonials: [
          {
            name: "Sarah Jenkins",
            role: "Mental Health Professional",
            text: "The Trauma-Informed Care course was incredibly transformative. It gave me both clinical and faith-based counseling frameworks that completely changed my practice.",
            rating: 5
          },
          {
            name: "David Kojo",
            role: "Community Pastor",
            text: "Stewardship Keys and Financial Intelligence helped us structure our community projects for real sustainability. The policy manuals and budgets tools were directly applicable.",
            rating: 5
          },
          {
            name: "Elena Rostova",
            role: "Peer Facilitator",
            text: "Addiction Recovery: Train the Trainer gave me the tools and confidence to lead support groups. The group dynamics and recovery models are outstanding.",
            rating: 5
          }
        ]
      }
    },
    {
      type: "Footer",
      props: {
        id: "Footer-1",
        copyrightText: "Mirror School of Transformation."
      }
    }
  ],
  root: {},
};

export default function AdminEditor() {
  const [data, setData] = useState(() => {
    // Check if we already have a saved layout in the browser's memory
    const saved = localStorage.getItem("puck-layout");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.content && parsed.content.length > 0) {
          // Migration: if any Partners block has the old text-based partners, remove it to fallback to new logo list
          parsed.content = parsed.content.map(block => {
            if (block.type === "Partners" && block.props && block.props.partners) {
              const hasLogo = block.props.partners.some(p => p.logoUrl);
              if (!hasLogo) {
                const { partners, ...restProps } = block.props;
                return { ...block, props: restProps };
              } else {
                // Filter out FIPCFA if it was previously saved in layout list
                const filteredPartners = block.props.partners.filter(p => p.name !== "FIPCFA");
                return {
                  ...block,
                  props: {
                    ...block.props,
                    partners: filteredPartners
                  }
                };
              }
            }
            return block;
          });
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing saved layout", e);
      }
    }
    return initialData;
  });

  // This runs when you click the "Publish" button in the top-right corner of the editor
  const handlePublish = (updatedData) => {
    console.log("Saving your cool new layout!", updatedData);

    // Save it to localStorage so your page updates don't disappear on refresh
    localStorage.setItem("puck-layout", JSON.stringify(updatedData));

    alert("Website layout saved successfully!");
  };

  return (
    // We give it a full height wrapper so the editor sidebar stays locked to your screen
    <div style={{ height: "100vh", width: "100vw" }}>
      <Puck 
        config={config}
        data={data}
        onPublish={handlePublish}
      />
    </div>
  );
}
