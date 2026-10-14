import { ContactWidget } from "./ContactWidget";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      title="Let's build something."
      subtitle="Open to AI/ML internships and select freelance projects."
    >
      <div className="space-y-12">
        <Reveal>
          <ContactWidget />
        </Reveal>
      </div>
    </Section>
  );
}
