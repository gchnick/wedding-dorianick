import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

interface FaqAccordionProps {
  faqs: FAQ[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  return (
    <Accordion
      className="FaqAccordion AccordionRoot w-full"
      type="single"
      collapsible
    >
      {faqs.map((faq) => (
        <AccordionItem value={faq.id} key={faq.id}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
