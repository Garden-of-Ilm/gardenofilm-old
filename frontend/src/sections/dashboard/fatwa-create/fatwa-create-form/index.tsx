import React, {useState} from "react";
import FatwaCreateFormStyles from "./fatwa-create-form.module.css";
import {ErrorInfoIcon} from "@/icons";
import Modal from "@/components/modal";
import RHFInputField from "@/components/hook-form/RHFInputField";
import RHFTextAreaField from "@/components/hook-form/RHFTextAreaField";
import AudioUpload from "@/sections/dashboard/fatwa-create/audio-upload";
import {Audio} from "@/api/fatwa-res";

interface IFormValues {
  author: string;
  detailed_answer: string;
  question_headline: string;
  full_question: string;
  additional_preference: string;

  [key: string]: string;
}

interface Props {
  error?: string | null;
  clearError: Function;
  audios: Audio[] | [];
}

function FatwaCreateForm({ error, clearError, audios }: Props) {
  const DesktopFatwaCreateForm = () => (
    <div className={FatwaCreateFormStyles.fatwaCreateForm}>
      <div className="container">
        {error && (
          <div className={FatwaCreateFormStyles.errorAlert}>
            <ErrorInfoIcon />
            {error}
          </div>
        )}
        <div className={FatwaCreateFormStyles.fatwaCreateFormDisplay}>
          <div>
            <RHFInputField name="author" placeholder="Who’s the author?" />

            <RHFTextAreaField
              className={FatwaCreateFormStyles.fatwaCreateFormQuestionHeadline}
              name="question_headline"
              placeholder="Question headline..."
            />
            <RHFTextAreaField
              name="full_question"
              className={FatwaCreateFormStyles.fatwaCreateFormFullQuestion}
              placeholder="Full question..."
            />
          </div>
          <div>
            <RHFTextAreaField
              name="detailed_answer"
              className={FatwaCreateFormStyles.fatwaCreateFormDisplayAnswer}
              placeholder="Detailed answer..."
            />
          </div>
        </div>
        <RHFTextAreaField
          name="additional_preference"
          className={
            FatwaCreateFormStyles.fatwaCreateFormDisplayAddionalPreferience
          }
          placeholder="Additional refrences..."
        />
        <AudioUpload audios={audios} />
      </div>
    </div>
  );

  const mobileInputs = [
    {
      name: "question_headline",
      label: "Question headline",
    },
    {
      name: "full_question",
      label: "Full question",
    },
    {
      name: "detailed_answer",
      label: "Detailed answer",
    },
    {
      name: "author",
      label: "Author",
    },
    {
      name: "additional_preference",
      label: "Additional references",
    },
    {
      name: "audios",
      label: "Audio",
    },
  ];
  const RenderMobileFatwaCreateForm = () => {
    const [active, setActive] = useState(mobileInputs[0]);
    const [openError, setOpenError] = useState(Boolean(error));

    return (
      <>
        <Modal open={Boolean(error)} setOpen={setOpenError}>
          <div className={FatwaCreateFormStyles.mobileErrorModal}>
            <p>{error}</p>
            <button type="button" onClick={() => clearError()}>
              Ok
            </button>
          </div>
        </Modal>
        <div className={FatwaCreateFormStyles.mobileFatwaCreateForm}>
          <div className={FatwaCreateFormStyles.mobileFatwaTabsWrapper}>
            <div className={FatwaCreateFormStyles.mobileFatwaTabs}>
              {mobileInputs.map((tab, index) => (
                  <p
                      key={index}
                      className={
                        active.label === tab.label
                            ? FatwaCreateFormStyles.activeMobileTab
                            : " "
                      }
                      onClick={() => setActive(tab)}
                  >
                    {tab.label}
                  </p>
              ))}
            </div>
          </div>
          <div className={active.name === "author" ? 'block' : 'hidden'}>
            <RHFTextAreaField
                name={"author"}
                placeholder="Write full answer here..."
                className=""
            />
          </div>
          <div className={active.name === "detailed_answer" ? 'block' : 'hidden'}>
            <RHFTextAreaField
                name={"detailed_answer"}
                placeholder="Write full answer here..."
                className=""
            />
          </div>
          <div className={active.name === "question_headline" ? 'block' : 'hidden'}>
            <RHFTextAreaField
                name={"question_headline"}
                placeholder="Write question headline here..."
                className=""
            />
          </div>

          <div className={active.name === "full_question" ? 'block' : 'hidden'}>
            <RHFTextAreaField
                name={"full_question"}
                placeholder="Write full question here..."
                className=""
            />
          </div>
          <div className={active.name === "additional_preference" ? 'block' : 'hidden'}>
            <RHFTextAreaField
                name={"additional_preference"}
                placeholder="Write additional references here..."
                className=""
            />
          </div>
          <div className={active.name === "audios" ? 'block' : 'hidden'}>
            <AudioUpload audios={audios}/>
          </div>
        </div>
      </>
    );
  };

  return (
      <>
        <DesktopFatwaCreateForm/>
        <RenderMobileFatwaCreateForm/>
      </>
  );
}

export default FatwaCreateForm;
