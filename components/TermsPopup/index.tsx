import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import { PopupContext } from "../../contexts/PopupContext";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import close from "../../public/assets/svgicons/close.svg";
import styles from "./styles.module.scss";

const TermsPopup = () => {
  const [canConnect, setCanConnect] = useState(false);

  const { popup, setPopup } = useContext(PopupContext);
  const { connect } = useContext(Web3ModalContext);

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  const changeTerms = () => {
    const button = document.getElementById("button");
    const checkbox = document.getElementById("termsCheck") as HTMLInputElement;

    if (button) {
      if (checkbox.checked) {
        button.style.cursor = "pointer";
        button.style.backgroundColor = "rgba(120, 214, 129, 1)";
        setCanConnect(true);
      } else {
        button.style.cursor = "auto";
        button.style.backgroundColor = "rgb(202, 202, 202)";
        setCanConnect(false);
      }
    }
  };

  return (
    <>
      {popup && (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <Image
                src={close.src}
                alt="close"
                width={13}
                height={13}
                style={{ cursor: "pointer" }}
                onClick={() => setPopup(false)}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.title}>Terms of Use</div>
              <div className={styles.subTitle}>Update Abril 2020</div>
              <div className={styles.description}>
                <strong>Information Published on the Website</strong>
                <br />
                This website (hereinafter referred to as the “Website”) is published and maintained to provide an expedient means of creating and voting on proposals on the XDC Network.  You are not authorized to, nor should you, rely on the Website for legal advice, business advice, investment advice, technical advice, or advice of any kind whatsoever.  You should not place any reliance on the information provided on the Website; you alone bear the full risk of any action taken or refrained from with regard to anything described on the Website or set forth in its contents.  You should not assume, or conclude on the basis of any information provided on the Website, that a token created using the Website will have the particular characteristics you expect or that the token will be suitable for any particular purpose.  Creation of a proposal on the Website will not ensure compliance with any law, regulation, or rule which is or may be applicable to your ownership or intended use of the created token.
                <br />
                <br />
                No reliance should be placed on any fact, data, or information you obtain from the Website in support of your decision to buy, sell, trade, exchange, hold (or hodl), give, accept, endorse, create or criticize any cryptocurrency, including XDC coin and other tokens on the XDC Network including tokens you create on the Website (collectively, <strong>“XDC Tokens”</strong>), or any other thing or idea which you believe may have or lack value of any kind.
                <br />
                <br />
                This Website is a tool.  As with every other tool built by humanity, this Website is well suited for very few applications and poorly suited for all others.  Mastery of any craft or subject matter necessarily lies in the master, not in the tools he or she employs.  Accordingly, you may not rely on this Website for any particular purpose but should instead consult qualified professional advisors prior to making any decision which could affect your legal, business, investment, or technical interests.
                <br />
                <br />
                <strong>Risks related to use of XDC Tokens</strong>
                <br />
                XDC Tokens, powered by XDC Network’s XDPoS consensus protocol, are private instruments which are not necessarily registered with any regulatory agency of any jurisdiction, and may not be subject to the same regulatory requirements as securities, exchange traded funds, mutual funds, or the like which would be registered with appropriate regulatory authorities (e.g., the Monetary Authority of Singapore or the Securities and Exchange Commission in the United States).  This is likely true of all tokens described in, referred to, or created on the Website.  Because XDC Tokens are not registered instruments, any information on the Website or elsewhere purporting to relate to pricing and valuation likely lacks the standardization and reliability typical of investment instruments.  XDC Tokens have not been reviewed or approved by federal, state, or local regulators of any jurisdiction.
                <br />
                <br />
                You should carefully note the following:
                <br />
                <br />
                To the extent any person would purchase or receive XDC Tokens for investment purposes, such investment is purely speculative investment and involves a high degree of risk. Any investor can lose all or a considerable portion of his or her investment, but this is particularly true with an investment that is unregulated.  The value of unregulated assets can drop to zero in less time than it takes to read these Terms of Use.  In addition, the process of creating a token is subject to error and any error committed by you or any other person while creating a token can have unexpected results.  In other words, the functionality of a token created on the Website may be unpredictable and should not be relied on for any purpose.
                <br />
                <br />
                Anyone planning to invest in any cryptocurrency, digital token, or XDC Token must have appropriate sophistication, experience, financial ability, and willingness to bear risks of an investment.  You should not assume you are such a person.  No investment in XDC Tokens should ever be made in an amount greater than the maximum loss you are willing and able to bear.
                <br />
                <br />
                Fees and expenses associated with transfer of XDC Tokens (which may be considerable, regardless of any other factors) may offset any trading profits that might be realized through the creation, ownership, purchase, sale, and exchange of XDC Tokens.
                <br />
                <br />
                In making statements on the Website, the site owner may rely on trading expertise and experience of third-party advisors, the identity of which may not be disclosed to the public, or may make such statements without any reliance on any expert, evidence, or authority whatsoever. The site owner may have conflicts of interest which affect the owner’s impartiality, beliefs, motivations, and understanding of any subject.
                <br />
                <br />
                These few risks described here are not a complete list of risks associated with reliance on the information set forth on the Website.  Other disclosures, which would be deemed necessary in order to make a knowing and informed investment, may be available on other websites or from other sources; such sources ought to be carefully reviewed prior to creating, owning, purchasing, trading, exchanging, staking, or selling XDC Tokens or otherwise incurring any risk associated therewith.
                <br />
                <br />
                <strong>Investment Risks</strong>
                <br />
                The price of XDC Tokens is highly volatile and you should expect prices to have wide-ranging fluctuations. Any investment in XDC Tokens can lead to loss of money over short or long periods. “Cryptocurrency” trading is not appropriate for all users of the Website and may not be appropriate for you. Anyone who is planning to invest in cryptocurrencies should consult a well-qualified, independent, and professional financial advisor. The information published on the Website is not a suitable replacement for such an advisor and cannot guarantee that a creator, owner, purchaser, or seller of XDC Tokens will not lose money.
                <br />
                <br />
                <strong>No Investment Advice</strong>
                <br />
                The entire body of information given on the Website does not consist of or include investment advice, trading advice, financial advice, technical advice, or any other kind of advice.  Under no circumstance should you take any of the Website’s content, including data, as advice or as information that is suitable to support an important decision. The site owner never recommends that you create, own, buy, sell or hold any XDC Tokens or participate or invest in any property or idea described on the Website.  Nothing on the Website should be considered as a proposal or recommendation that you create, own, buy, sell or hold any XDC Tokens. The closest thing to advice we can offer you is to emphatically state that you should fully conduct your own due diligence and consult one or more qualified professional financial advisors before you make any investment decisions.
                <br />
                <br />
                <strong>Disclaimer of Warranties</strong>
                <br />
                The Website is provided on an “as is” basis without any warranties of any kind regarding the Website or any content, data, material, information, or services provided on the Website.
                <br />
                <br />
                <strong>Limitation of Liability</strong>
                <br />
                In no event shall the site owner be liable for any direct, indirect, special or consequential damages of any kind, including, but not limited to, loss of use, loss of profits, loss of tokens, or loss of data arising out of or in any way connected with the use of the Website or <strong>XDC Tokens</strong>.
                <br />
                <br />
                <strong>Accuracy of Information</strong>
                <br />
                Blockchain is developing rapidly.  Information related to blockchain, cryptocurrency, and other related technology is changing constantly.  The owners of the Website intentionally and continuously allow and encourage participation and communication by the community at large.  In light of these facts, the site owner makes no general or specific assurances of accuracy with respect to the Website or any information on it.  The site owner holds no responsibility for any wrong, misleading, outdated, or missing information, or any malfunction or inaccurate results attained through use of any function on the Website. By using the Website, you represent that you are utilizing any and all information present on the Website at your own risk.
                <br />
                <br />
                <strong>Modifications to the Site</strong>
                <br />
                The site owner reserves the right to change or modify the terms and conditions contained in these Terms of Use, any policy or guideline of the Website, and the content of the Website, including without limitation the very existence of the Website, at any time and in its sole discretion. The only notice of such changes will be by posting the revised terms, policy, guideline, or content to the Website. Any changes or modifications will be effective immediately upon posting the revisions to the Website and will apply to all subsequent use of the Website without regard to any corresponding change to these Terms of Use.  Your continued use of the Website will confirm your acceptance of such changes or modifications; therefore, you should review the terms, applicable policies, and content whenever you use the Website to understand the terms that apply to such use.
                <br />
                <br />
                <strong>Links to Other Sites</strong>
                <br />
                The Website may contain links to other websites which are not managed by the owner of the Website. The features, content and accessibility of those sites are not controlled by the owner of the Website. The inclusion of any such links does not imply the approval or endorsement of the content included in the linked sites.
                <br />
                <br />
                <strong>Website Downtime & Maintenance</strong>
                <br />
                At various and unpredictable times, the Website will be down for maintenance, updating, or for reasons not yet anticipated.  The site owner is not liable to you for damages, difficulties, or inconvenience caused by the unavailability of the Website regardless of the cause of the unavailability.
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.left}>
                <input
                  type="checkbox"
                  name="termsCheck"
                  id="termsCheck"
                  onChange={() => changeTerms()}
                />
                <span>I agree to terms and conditions.</span>
              </div>
              <div className={styles.right}>
                <div
                  className={styles.button}
                  id="button"
                  onClick={() => {
                    if (canConnect) {
                      setPopup(false);
                      handleConnect();
                    }
                  }}
                >
                  Connect
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsPopup;
