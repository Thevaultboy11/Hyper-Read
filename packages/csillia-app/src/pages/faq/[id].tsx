import FaxWrapper from "../../component/wrapper/FaqWrapper";
import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useRouter } from "next/router";
import handle_protected_routes from "../../lib/auth/handle_protected_routes";

const fax_data = [
  [
    {
      title: "How can I track my reading speed with the speed Reading app?",
      body: "The speed Reading app includes built-in analytics that allow you to track your reading speed over time. Simply start a reading session within the app, and the analytics will automatically track your reading speed and provide you with detailed information about your progress.",
    },
    {
      title:
        "What kind of data can I see in the speed Reading app's analytics?",
      body: "The speed Reading app's analytics provide a variety of data points to help you track your reading progress. These include your reading speed over time, the amount of time spent reading, and the number of words read per minute. You can also see which books or articles you've read, how long it took you to read them, and how much you retained from each reading session.",
    },
    {
      title: "How can I use the analytics to improve my speed reading skills?",
      body: "The analytics provided by the speed Reading app can be used to identify areas for improvement in your speed reading skills. For example, if you notice that your reading speed decreases when reading certain types of content or during certain times of day, you can adjust your reading habits to address these issues. You can also use the analytics to set goals for yourself and track your progress as you work to improve your reading speed and comprehension.",
    },
  ],
  [
    {
      title: "What is speed reading?",
      body: "Speed reading is a technique that helps individuals read faster and more efficiently. It involves a variety of strategies, such as skimming, scanning, and chunking text, to increase reading speed without sacrificing comprehension. Speed reading can be a valuable skill for students, professionals, and anyone who needs to process large amounts of information quickly.",
    },
    {
      title: "How can I learn to speed read?",
      body: "There are many resources available for individuals who want to learn to speed read. These include online courses, books, and apps that provide training exercises and strategies for improving reading speed and comprehension. Practice is key to developing speed reading skills, so it's important to set aside dedicated time to practice these techniques regularly.",
    },
    {
      title: "Is speed reading right for me?",
      body: "Speed reading can be a useful skill for anyone who needs to process large amounts of information quickly. However, it may not be the best approach for everyone. Some individuals may find that they prefer to read at a slower pace to fully absorb information and maintain comprehension. It's important to experiment with different reading speeds and techniques to find what works best for you.",
    },
  ],
  [
    {
      title: "What is Reading app?",
      body: "Reading app is the ultimate 21st century Edtech solution for those who seek to maximize their productivity and enhance their learning abilities. It's a cutting-edge program that uses groundbreaking technology to increase your information processing speed up to 3-4 times! The best part? Reading app helps you maintain full focus and improves information retention so that you can achieve your goals in record time. Say goodbye to sluggish reading and hello to the future of flipping!",
    },
    {
      title: "How does Reading app help process written information faster?",
      body: "Reading app is a revolutionary program that enhances your ability to process written information rapidly and efficiently. Our unique approach involves flipping words at adjustable speeds, training your brain to scan and absorb information faster without sacrificing comprehension with provided frequent scheduled breaks to internalize information. Moreover, our binary music synchronizes your brainwaves, improving cognitive function, and making the learning experience more enjoyable. Flipping is the new reading, smarter learning, let's start leading!",
    },
    {
      title: "How long does it take to see results with Reading app?",
      body: "At Reading app, we understand that time is a precious commodity. That's why our program is designed to deliver results quickly and efficiently. To get started, we'll test your conventional reading speed and set you up with that pace. From there, you'll start seeing results instantly! Don’t believe us? Join the Reading app and flip your brain to a new degree, unlock your learning destiny.",
    },
    {
      title: "Who can benefit from using Reading app?",
      body: "Reading app is an exceptional tool that can benefit anyone who needs to process written information, regardless of age or experience level. Whether you're a young student struggling to keep up with coursework, a busy professional trying to juggle multiple projects, or a senior looking to stay sharp and engaged, Reading app is there to help. With our cutting-edge techniques, we can cut your written information processing time by 3 to 4 times, allowing you to learn and retain information faster and more efficiently than ever before! Don't doubt - just flip it out!",
    },
    {
      title: "What does Reading app include?",
      body: "Reading app is one stop shop! With access to over 300,000 books and the ability to read any PDF file, you'll never run out of material to flip through. Our unique binary music and background music library will have you grooving as you flip. Plus, our guidance for mental and physical preparation will get you ready to flip like a pro. We even include regular scheduled breaks for maximum learning enhancement. And with up to 100 personal choice words for speed flipping practice, you'll be flipping through information faster than ever before. Reading app: where learning meets the future!",
    },
    {
      title: "How does Reading app compare to conventional reading?",
      body: "Reading app is a revolutionary alternative to conventional reading that offers a faster and more efficient way of processing written information. Instead of reading word by word, Reading app uses a unique approach that involves flipping words at adjustable speeds, training your brain to scan and absorb information faster without sacrificing comprehension. So, compared to conventional reading, Reading app offers a faster, more efficient, and more enjoyable way to learn!",
    },
    {
      title: "Is there a free trial available for Reading app?",
      body: `Absolutely! At Reading app, we believe in giving our users the opportunity to
    experience the benefits of our program before making a commitment. That&#39;s why we
    offer a 2-week free trial for all new users. During this time, you&#39;ll have access to all of
    our program features and experience the transformative power of our flipping
    technology. After the free trial, you can opt for a monthly subscription to continue using
    our program and taking your flipping skills to the next level. So why wait? Sign up for
    Reading app today and start your free trial to experience the future of learning`,
    },
    {
      title: `What scientific research supports the effectiveness of Reading app?`,
      body: `While there is no scientific research that directly supports the effectiveness of Flip
    protocol, our program has been developed through extensive experimentation to
    ensure that it delivers results. We understand that our users value evidence-based
    solutions, and that&#39;s why we encourage you to try and test Reading app for yourself.
    Our program is designed to improve your flipping skills, increase your speed and
    comprehension, and help you process written information more efficiently. So why wait?
    Sign up for Reading app today and experience the future of learning firsthand!&quot;`,
    },
  ],
];
function AccordionComponent({ title, body }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAccordionToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Accordion
      elevation={0}
      sx={{
        "&.MuiPaper-root": {
          boxShadow: "none",
          backgroundColor: "transparent",
          zIndex: 1,
        },
      }}
      expanded={isOpen}
      onChange={handleAccordionToggle}
    >
      <AccordionSummary
        sx={{ zIndex: -1 }} // Change the z-index value to -1
        expandIcon={
          isOpen ? (
            <AiOutlineMinus color="text-primary400" size="1.5em" />
          ) : (
            <AiOutlinePlus color="text-primary400" size="1.5em" />
          )
        }
      >
        <p className={`${isOpen ? "text-primary400 " : ""} h4`}>{title}</p>
      </AccordionSummary>
      <AccordionDetails>
        <p className="p1">{body}</p>
      </AccordionDetails>
    </Accordion>
  );
}

function FaxId() {
  const router = useRouter();
  const { slug, id } = router.query;
  const pageID = slug || (id ? id : 1);
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl  px-8">
      <div className="z-2 grid grid-cols-12 gap-4">
        <div className="z-2 col-span-12 min-h-max rounded-xl  bg-white p-24">
          {fax_data[pageID - 1].map((i: any, idx: number) => (
            <div className="col-span-12 ">
              <AccordionComponent key={idx} title={i.title} body={i.body} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
FaxId.Layout = FaxWrapper;

export default FaxId;
