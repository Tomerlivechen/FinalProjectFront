import { useEffect, useState } from "react";
import CommentView from "./CommentView";
import { ICommentDisplay } from "../../Models/Interaction";
import { FaComments } from "react-icons/fa";
import { FaCommentSlash } from "react-icons/fa";
import { VscCommentDraft } from "react-icons/vsc";
import { colors } from "../../Constants/Patterns";
import { CommentListValues } from "../../Types/@CommentTypes";

const CommentList: React.FC<CommentListValues> = ({ index, commmentList }) => {
  const comments = commmentList;

  const [next20Comments, setnext20Comments] = useState<
    ICommentDisplay[] | null
  >(null);
  const [passedIndex, setpassedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(false);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (index > 1) {
      setNext(true);
    }
  }, [index]);

  useEffect(() => {
    if (commmentList) {
      const left = commmentList.length - index;
      if (left > 0) {
        const nextComments = commmentList.slice(
          index,
          index + Math.min(amount, left)
        );
        setnext20Comments(nextComments);
        setpassedIndex(index + Math.min(amount, left));
      } else {
        setnext20Comments(null);
      }
    }
  }, [commmentList, index, amount]);

  const toggelOpen = () => {
    setOpen((prevOpen) => !prevOpen);
    setAmount(5);
  };

  const increasAmount = () => {
    setAmount((prevAmount) => prevAmount + 5);
  };

  return (
    <>
      {next20Comments ? (
        <>
          <button
            className={`rounded-lg ${colors.ElementFrame}  relative bottom-0 left-10`}
            onClick={toggelOpen}
          >
            {open ? (
              <FaCommentSlash size={25} aria-description="Close" />
            ) : (
              <FaComments size={25} aria-description="View Comments" />
            )}
          </button>
          {open && (
            <>
              <div
                className="-mt-1.5"
                style={{
                  position: "relative",
                  left: "20px",
                  top: "10px",
                }}
              >
                {next20Comments.map((comment) => (
                  <CommentView key={comment.id} {...comment} />
                ))}
                {comments && passedIndex != comments.length && (
                  <button
                    className={`rounded-lg w-40 ml-6 mb-3 mt-4 h-auto ${colors.ElementFrame}`}
                    onClick={increasAmount}
                  >
                    More
                  </button>
                )}

                {passedIndex == next20Comments.length && (
                  <>
                    <button
                      className={`rounded-lg ${colors.ElementFrame} w-24 ml-6 mb-3 mt-3 h-auto`}
                      onClick={toggelOpen}
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {!next20Comments && (
            <button
              className={`rounded-lg ${colors.ElementFrame}  relative bottom-0 left-5`}
            >
              {!next ? (
                <VscCommentDraft size={25} aria-description="No Comments" />
              ) : (
                "No More Comments"
              )}
            </button>
          )}
        </>
      )}
    </>
  );
};

export { CommentList };
