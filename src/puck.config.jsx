// puck.config.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Subjects from "./components/Subjects";
import CourseGrid from "./components/CourseGrid";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export const config = {
  components: {
    Navbar: {
      fields: {
        logoText: { type: "text", contentEditable: true },
        logoImgSrc: { type: "text" },
        logoWidth: { type: "text" },
        logoHeight: { type: "text" },
        containerPadding: { type: "text" },
        signInText: { type: "text", contentEditable: true },
        registerText: { type: "text", contentEditable: true }
      },
      render: (props) => <Navbar {...props} />
    },
    Hero: {
      fields: {
        title: { type: "text", contentEditable: true },
        titleSize: { type: "text" },
        subtitle: { type: "textarea", contentEditable: true },
        subtitleSize: { type: "text" },
        buttonText: { type: "text", contentEditable: true },
        buttonUrl: { type: "text" },
        buttonPadding: { type: "text" },
        buttonBgColor: { type: "text" },
        imageUrl: { type: "text" },
        imageHeight: { type: "text" },
        imageWidth: { type: "text" },
        imageBorderRadius: { type: "text" },
        containerWidth: { type: "text" },
        paddingY: { type: "text" },
        gap: { type: "text" }
      },
      render: (props) => <Hero {...props} />
    },
    Partners: {
      fields: {
        title: { type: "text", contentEditable: true },
        titleSize: { type: "text" },
        containerWidth: { type: "text" },
        paddingY: { type: "text" },
        gap: { type: "text" },
        partners: {
          type: "array",
          getItemSummary: (item) => item.name || "Partner Logo Text",
          arrayFields: {
            name: { type: "text", contentEditable: true },
            logoUrl: { type: "text" },
            logoWidth: { type: "text" },
            logoHeight: { type: "text" }
          }
        }
      },
      render: (props) => <Partners {...props} />
    },
    Subjects: {
      fields: {
        badge: { type: "text", contentEditable: true },
        badgeSize: { type: "text" },
        containerWidth: { type: "text" },
        paddingY: { type: "text" },
        faculties: {
          type: "array",
          getItemSummary: (item) => item.title || "Faculty Slide",
          arrayFields: {
            title: { type: "text", contentEditable: true },
            titleSize: { type: "text" },
            description: { type: "textarea", contentEditable: true },
            descriptionSize: { type: "text" },
            exploreUrl: { type: "text" },
            image: { type: "text" },
            imageHeight: { type: "text" },
            imageWidth: { type: "text" },
            imageBorderRadius: { type: "text" }
          }
        }
      },
      render: (props) => <Subjects {...props} />
    },
    CourseGrid: {
      fields: {
        title: { type: "text", contentEditable: true },
        titleSize: { type: "text" },
        buttonText: { type: "text", contentEditable: true },
        buttonUrl: { type: "text" },
        containerWidth: { type: "text" },
        paddingY: { type: "text" },
        courses: {
          type: "array",
          getItemSummary: (item) => item.title || "Course",
          arrayFields: {
            type: { type: "text", contentEditable: true },
            title: { type: "text", contentEditable: true },
            university: { type: "text", contentEditable: true },
            duration: { type: "text", contentEditable: true },
            image: { type: "text" },
            imageHeight: { type: "text" }
          }
        }
      },
      render: (props) => <CourseGrid {...props} />
    },
    Testimonials: {
      fields: {
        title: { type: "text", contentEditable: true },
        subtitle: { type: "textarea", contentEditable: true },
        testimonials: {
          type: "array",
          getItemSummary: (item) => item.name || "Testimony Slide",
          arrayFields: {
            name: { type: "text", contentEditable: true },
            role: { type: "text", contentEditable: true },
            text: { type: "textarea", contentEditable: true },
            avatarUrl: { type: "text" },
            rating: { type: "number", min: 1, max: 5 }
          }
        }
      },
      render: (props) => <Testimonials {...props} />
    },
    Footer: {
      fields: {
        copyrightText: { type: "text", contentEditable: true },
        containerWidth: { type: "text" },
        paddingY: { type: "text" }
      },
      render: (props) => <Footer {...props} />
    }
  }
};
