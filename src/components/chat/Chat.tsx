import { useContext, useState } from "react";
import "./Chat.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Markdown from "react-markdown";

type Role = "student" | "businessman" | "traveler";

interface CaseOptions {
  [key: string]: string[];
}

const caseOptions: CaseOptions = {
  student: ["Study Abroad", "Scholarships", "Part-time Work"],
  businessman: [
    "International Trade",
    "Market Analysis",
    "Business Strategies",
  ],
  traveler: ["Currency Exchange", "Travel Budgeting", "International Shopping"],
};

const detailCaseOptions: CaseOptions = {
  student: [
    "As a student, I need to understand the exchange rates to inform my decision on studying abroad. Please provide an analysis of the factors affecting these exchange rates, as well as predictions on their future movements. I am also interested in the potential impact of these exchange rate changes on my tuition fees and living expenses. This information is crucial for me in planning my study abroad experience. Thank you.",
    "As a student, I am looking into taking online courses from foreign institutions. Can you explain how exchange rates influence the cost of these courses? Additionally, what are the potential financial risks and benefits associated with fluctuating exchange rates over the course duration?",
    "As a student seeking an international internship, I need to understand how exchange rates will affect my stipend and expenses in a foreign country. Could you provide insights into how exchange rate fluctuations might impact my overall budget and financial planning during my internship?",
  ],

  businessman: [
    "As a businessman, I need to develop effective business strategies considering exchange rate fluctuations. Please provide an analysis of the current exchange rates and their potential impact on international trade, pricing strategies, and competitive positioning. How can I hedge against adverse currency movements?",
    "As a businessman involved in import/export activities, understanding exchange rates is crucial for pricing and cost management. Can you explain how exchange rates affect the cost of goods sold and profit margins? What strategies can I employ to mitigate the risks associated with exchange rate volatility?",
    "As a businessman looking to invest in foreign markets, I need to consider exchange rates in my investment decisions. Please provide an analysis of how currency fluctuations can impact the returns on foreign investments. What are the best practices for managing exchange rate risk in international investments?",
  ],
  traveler: [
    "As a traveler planning a vacation abroad, I need to understand how exchange rates will affect my travel budget. Can you provide insights into the current exchange rates and their potential impact on accommodation, dining, and entertainment expenses? What are the best practices for exchanging currency to get the best rates?",
    "As a traveler planning a long-term trip, I need to manage my finances carefully considering exchange rates. Could you explain how exchange rate fluctuations might impact my overall travel costs, including accommodation, food, and transportation? What strategies can I use to minimize the financial impact of unfavorable exchange rate changes?",
    "As a traveler visiting multiple countries, I need to navigate different exchange rates. How can I effectively manage my finances across various currencies? Please provide advice on how to track and optimize currency exchange while traveling through several countries?",
  ],
};

const Chat = () => {
  const { onSent, recentPrompt, showResult, loading, chats, isFirst } =
    useContext(Context);

  // const location = useLocation();
  // const { exchange_rates } = location.state;

  const [selectedRole, setSelectedRole] = useState<Role | "">("");
  const [selectedCase, setSelectedCase] = useState<string>("");

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value as Role;
    setSelectedRole(role);
    setSelectedCase("");
  };

  const handleCaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCase(event.target.value);
  };

  return (
    <div className="chat">
      <div className="chat-container">
        {!showResult ? (
          <>
            <div className="greets">
              <p>
                <span>Kursdollar AI</span>
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
          <div className="dropdown-row">
            <select value={selectedRole} onChange={handleRoleChange}>
              <option value="" disabled>
                Select role
              </option>
              <option value="student">Student</option>
              <option value="businessman">Businessman</option>
              <option value="traveler">Traveler</option>
            </select>

            <select
              value={selectedCase}
              onChange={handleCaseChange}
              disabled={!selectedRole}
            >
              <option value="" disabled>
                Select case
              </option>
              {selectedRole &&
                caseOptions[selectedRole].map((caseOption) => (
                  <option key={caseOption} value={caseOption}>
                    {caseOption}
                  </option>
                ))}
            </select>
          </div>
          <div className="send-button">
            <button
              onClick={() => {
                if (selectedRole && selectedCase) {
                  const exchange_rates = {
                    IDRExchangeRate: {
                      USD: {
                        buy: "15898.11",
                        sell: "16057.89",
                      },
                      SGD: {
                        buy: "11805.24",
                        sell: "11928.31",
                      },
                      EUR: {
                        buy: "17258.99",
                        sell: "17438.87",
                      },
                      CNY: {
                        buy: "2201.68",
                        sell: "2224.02",
                      },
                      GBP: {
                        buy: "20119.06",
                        sell: "20327.68",
                      },
                      JPY: {
                        buy: "102.02",
                        sell: "103.05",
                      },
                      SAR: {
                        buy: "4238.93",
                        sell: "4281.76",
                      },
                    },
                  };
                  onSent(
                    detailCaseOptions[selectedRole][
                      caseOptions[selectedRole].indexOf(selectedCase)
                    ],
                    "fake",
                    detailCaseOptions[selectedRole][
                      caseOptions[selectedRole].indexOf(selectedCase)
                    ],
                    JSON.stringify(exchange_rates)
                  );
                }
              }}
              disabled={!selectedRole || !selectedCase}
            >
              Ask Now
            </button>
          </div>
          <p className="bottom-info">
            The information provided by the AI is not guaranteed to be accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
