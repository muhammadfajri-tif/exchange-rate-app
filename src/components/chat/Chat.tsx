import { useContext } from "react";
import "./Chat.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";

const Chat = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    chats,
    setInput,
    input,
    isFirst,
  } = useContext(Context);

  const location = useLocation();
  const { exchange_rates } = location.state;

  return (
    <div className="chat">
      <div className="nav">
        {/* button for navigate back */}
        <img
          onClick={() => window.history.back()}
          src={assets.send_icon}
          alt=""
        />
      </div>
      <div className="chat-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Cantik.</span>
              </p>
              <p>How can I help you today..?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summerize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstrom team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          // map through chats
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
                      <Markdown>{chat.parts[0].text}</Markdown>
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
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img
                  onClick={() => onSent(input, JSON.stringify(exchange_rates))}
                  // onClick={() => {
                  //   console.log("input", input);
                  //   console.log(
                  //     "exchange_rates",
                  //     JSON.stringify(exchange_rates)
                  //   );
                  // }}
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemiini may display inaccurate info, including about people, so
            double-click its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
