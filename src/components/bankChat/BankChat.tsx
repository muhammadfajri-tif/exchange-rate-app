import { useContext } from "react";
import "./BankChat.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Markdown from "react-markdown";

const BankChat = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    chats,
    isFirst,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="chat">
      <div className="chat-container">
        {!showResult ? (
          <>
            <div className="greets">
              <p>
                <span>Exchange Rate AI</span>
              </p>
              <p>Exchange rates are updated every 24 hours. Ask me anything!</p>
            </div>
          </>
        ) : (
          <div className="result">
            {isFirst ? (
              <div>
                <div className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                </div>
              </div>
            ) : (
              chats.map((chat, index) =>
                loading && index === chats.length - 1 ? (
                  <div>
                    <div key={index} className="result-title">
                      <img src={assets.user_icon} alt="" />
                      <p>{recentPrompt}</p>
                    </div>
                    <div key={index} className="result-data">
                      <img src={assets.gemini_icon} alt="" />
                      <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                      </div>
                    </div>
                  </div>
                ) : chat.role === "user" ? (
                  <div>
                    <div key={index} className="result-title">
                      <img src={assets.user_icon} alt="" />
                      <p>{chat.parts[0].text}</p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    <div className="result-text">
                      <Markdown
                        components={{
                          p: ({ node, ...props }) => (
                            <p {...props} style={{ margin: "0" }} />
                          ),
                          // make indent and point for list
                          li: ({ node, ...props }) => (
                            <li
                              {...props}
                              style={{
                                marginLeft: "1rem",
                                listStyleType: "disc",
                              }}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul {...props} style={{ padding: "0" }} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol {...props} style={{ padding: "0" }} />
                          ),
                        }}
                      >
                        {chat.parts[0].text}
                      </Markdown>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        )}

        <div className="chat-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here "
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent(input, "");
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img
                  onClick={() => onSent(input, "")}
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>

          <p className="bottom-info">
            The information provided by the AI is not guaranteed to be accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankChat;
