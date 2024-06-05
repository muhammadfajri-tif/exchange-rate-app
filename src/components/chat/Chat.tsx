import { useContext, useState } from "react";
import "./Chat.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Markdown from "react-markdown";

type Role =
  | "investor"
  | "company"
  | "consumer"
  | "bank and financial institution"
  | "government";

interface CaseOptions {
  [key: string]: string[];
}

const caseOptions: CaseOptions = {
  investor: [
    "Foreign Currency Investment",
    "Portofolio Diversification",
    "Currency Trend Prediction",
    "Investment Risk Management",
  ],
  company: [
    "International Transactions",
    "Fund Management",
    "Foreign Exchange Hedging",
    "Production Cost Analysis",
  ],
  consumer: [
    "Purchasing Imported Goods",
    "Traveling Abroad",
    "Savings in Foreign Currency",
    "Repaying Foreign Debt",
  ],
  bank_and_financial: [
    "Foreign Exchange Products",
    "Reserve Mangement",
    "Credit Risk Analysis",
    "Bank Investment Strategy",
  ],
  government: [
    "Monetary Policy",
    "Fiscal Policy",
    "International Trade",
    "Economic Stability",
  ],
};

const detailCaseOptions: CaseOptions = {
  investor: [
    "As an investor, I am interested in understanding the potential returns from investing in foreign currencies. Please provide an analysis of the current exchange rates, factors influencing these rates, and predictions for their future movements. Additionally, explain the risks involved and how I can maximize my returns. This information is essential for my investment strategy. Thank you.",
    "As an investor looking to diversify my portfolio with foreign currencies, I need detailed information on which currencies are currently strong and stable. Please provide insights into the current exchange rates, factors affecting them, and future predictions. How can I effectively diversify my portfolio to minimize risk and optimize returns? Thank you.",
    "As an investor, I require a detailed prediction of currency trends over the next few months. Please analyze the current exchange rates, factors driving these rates, and their likely future movements. How can these trends impact my investment decisions? Your analysis will help me in planning my investments. Thank you.",
    "As an investor, managing risk in foreign currency investments is crucial. Please provide a detailed analysis of current exchange rates, the factors causing their fluctuations, and strategies to manage these risks. How can I protect my investments from adverse currency movements? This information is vital for my risk management strategy. Thank you.",
  ],

  company: [
    "As a company involved in numerous international transactions, we need to understand how current and future exchange rates will impact our transaction costs. Please provide an analysis of current exchange rates, factors influencing these rates, and their predicted movements. This information is crucial for managing our international finances. Thank you.",
    "As a company managing funds in multiple currencies, we require detailed insights on the best strategies for managing these funds given current and predicted exchange rates. Please analyze the factors affecting exchange rates and suggest effective fund management strategies. This will help optimize our financial operations. Thank you.",
    "As a company looking to hedge against foreign exchange risks, we need an analysis of current exchange rates, factors influencing these rates, and effective hedging strategies. How can we protect our business from adverse currency fluctuations? This information is essential for our risk management. Thank you.",
    "As a company analyzing production costs, we need to understand how changes in exchange rates can impact these costs. Please provide a detailed analysis of current and future exchange rates, factors driving these rates, and their impact on our production expenses. This information is crucial for our cost management strategy. Thank you.",
  ],
  consumer: [
    "As a consumer looking to purchase imported goods, I need to understand how current exchange rates affect prices. Please provide an analysis of the current exchange rates, factors influencing these rates, and predictions for future movements. How will these changes impact the cost of imported products? This information is important for my purchasing decisions. Thank you.",
    "As a consumer planning to travel abroad, I need to know the best time to exchange currency. Please provide an analysis of the current exchange rates, factors influencing these rates, and future predictions. How will these rates affect my travel expenses? This information is essential for planning my trip. Thank you.",
    "As a consumer considering saving in foreign currency, I need detailed information on the stability and strength of various currencies. Please provide an analysis of current exchange rates, factors affecting these rates, and future predictions. How can I optimize my savings in foreign currencies? This information is crucial for my savings strategy. Thank you.",
    "As a consumer with foreign debt, I need to understand how exchange rate fluctuations will affect my repayment amounts. Please provide an analysis of current exchange rates, factors driving these rates, and their future predictions. How can I manage my debt repayment effectively? This information is vital for my financial planning. Thank you.",
  ],
  bank_and_financial: [
    "As a bank looking to offer foreign exchange products, we need an analysis of current exchange rates, factors influencing these rates, and predictions for future movements. What products can we offer to our clients based on this information? This is essential for developing our product offerings. Thank you.",
    "As a financial institution managing reserves in multiple currencies, we need detailed insights into the best strategies for reserve management given current and predicted exchange rates. Please analyze the factors affecting exchange rates and suggest effective management strategies. This will help optimize our reserve management. Thank you.",
    "As a bank, understanding how exchange rate fluctuations impact credit risk is crucial. Please provide a detailed analysis of current exchange rates, the factors causing their fluctuations, and how these changes affect credit risk. This information is vital for our risk assessment processes. Thank you.",
    "As a financial institution, we need to develop an effective investment strategy based on current and predicted exchange rates. Please provide an analysis of these rates, factors influencing them, and their future movements. How can we optimize our investments in foreign currencies? This information is crucial for our investment planning. Thank you.",
  ],
  government: [
    "As a government official, I need to understand how current exchange rate fluctuations affect our monetary policy. Please provide an analysis of the current exchange rates, factors driving these rates, and their predicted movements. How should we adjust our monetary policy in response to these changes? This information is crucial for policy formulation. Thank you.",
    "As a government official, understanding the impact of exchange rate changes on our fiscal policy is essential. Please provide an analysis of current exchange rates, factors influencing these rates, and their future predictions. How can we adapt our fiscal policy to these changes? This information is vital for our financial planning. Thank you.",
    "As a government official, I need to understand how exchange rate fluctuations affect our international trade. Please provide an analysis of current exchange rates, factors driving these rates, and their future predictions. How will these changes impact our trade balance? This information is important for trade policy development. Thank you.",
    "As a government official, maintaining economic stability amidst exchange rate fluctuations is crucial. Please provide an analysis of current exchange rates, factors influencing these rates, and future predictions. What measures can we take to ensure economic stability in light of these changes? This information is essential for our economic policy. Thank you.",
  ],
};

const Chat = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    chats,
    isFirst,
    payload,
    input,
    setInput,
  } = useContext(Context);

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
          {!showResult ? (
            <div>
              <div className="dropdown-row">
                <select value={selectedRole} onChange={handleRoleChange}>
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="investor">Investor</option>
                  <option value="company">Company</option>
                  <option value="consumer">Consumer</option>
                  <option value="bank_and_financial">
                    Bank and Financial Instition
                  </option>
                  <option value="government">Government</option>
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
                        detailCaseOptions[selectedRole][
                          caseOptions[selectedRole].indexOf(selectedCase)
                        ],
                        payload
                          ? JSON.stringify(payload.slice(0, 100))
                          : JSON.stringify(exchange_rates)
                      );
                    }
                  }}
                  disabled={!selectedRole || !selectedCase}
                >
                  Ask Now
                </button>
              </div>
            </div>
          ) : (
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
          )}

          <p className="bottom-info">
            The information provided by the AI is not guaranteed to be accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
