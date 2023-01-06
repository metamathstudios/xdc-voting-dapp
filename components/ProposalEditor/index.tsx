import dynamic from "next/dynamic";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { NotificationManager } from "react-notifications";
import Slider from "@mui/material/Slider";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import ImageInput from "./components/ImageInput";
import ImageInputRemovable from "./components/ImageInputRemovable";
import LinkInput from "./components/LinkInput";
import LinkInputRemovable from "./components/LinkInputRemovable";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import { useRouter } from "next/router";
import { Theme, ThemeContext } from "../../contexts/ThemeContext";
import { PreviewContext } from "../../contexts/PreviewContext";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import { BlockchainContext } from "../../contexts/BlockchainProvider";
import { ProposalsContext } from "../../contexts/ProposalsContext";
import { generateHexString } from "../../utils";
import { createProposal } from "../../services/api";
import { VotingHubAddress } from "../../blockchain/constants";
import type { Proposal, Option } from "../../services/api";
import Button from "../reusable/Button";
import back from "./assets/back.svg";
import less from "./assets/less.svg";
import rotatingArrow from "./assets/rotatingarrow.svg";
import more from "./assets/more.svg";
import preview from "./assets/preview.svg";
import publish from "./assets/publish.svg";

const ProposalEditorComponent = () => {
  const { theme } = useContext(ThemeContext);

  const router = useRouter();
  const { value, setValue, title, setTitle, startDate, setStartDate, endDate, setEndDate, toll, setToll, approvalThreshold, setApprovalThreshold, tags, setTags } = useContext(PreviewContext);
  const { account, chainId } = useContext(Web3ModalContext);
  const { votingHub } = useContext(BlockchainContext);
  const { all } = useContext(ProposalsContext);

  const [renderNumberLink, setRenderNumberLink] = useState(0);
  const [renderNumberImage, setRenderNumberImage] = useState(0);
  const [dropdown, setDropdown] = useState(true);
  const [treasury, setTreasury] = useState(false);
  const [core, setCore] = useState(false);
  const [xdc, setXdc] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("Publishing... Please Wait");
  const [uniquehash, setUniqueHash] = useState("0x0");
  const [publishing, setPublishing] = useState(false);

  const handleRenderNumberLink = () => {
    setRenderNumberLink((current) => current + 1);
  };

  const handleRemoveNumberLink = () => {
    setRenderNumberLink((current) => current - 1);
  };

  const handleRenderNumberImage = () => {
    setRenderNumberImage((current) => current + 1);
  };

  const handleRemoveNumberImage = () => {
    setRenderNumberImage((current) => current - 1);
  };

  const valuetext = (value: number) => {
    return `${value}`;
  };

  useEffect(() => {
    if (uniquehash === "0x0") {
      setUniqueHash(`0x${generateHexString(32)}`);
    }
  }, [uniquehash]);

  useEffect(() => {
    if (core && treasury && xdc && urgent) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
    let tags = [core ? "CORE" : "", treasury ? "TREASURY" : "", xdc ? "XDC_COMMUNITY" : "", urgent ? "URGENT" : ""];
    tags = tags.filter((tag) => tag !== "");
    setTags(tags)
  }, [core, treasury, xdc, urgent]);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.centerColumn}>
          <div className={styles.userOptions}>
            <div
              className={styles.backContainer}
              onClick={() => router.push("/")}
            >
              <Image
                src={theme == Theme.DARK ? back : back}
                alt="Back"
                width={17}
              />
              <div className={styles.text}>Back</div>
            </div>

            <div className={styles.rightContainer}>
              <div onClick={() => router.push("/preview")}>
                <Button icon={preview} text="Preview" />
              </div>

              <div onClick={() => {
                if(!account || !chainId) {
                  NotificationManager.error("Please connect your wallet to publish a proposal");
                  return
                } else if (!title) {
                  NotificationManager.error("Please add a title to your proposal");
                  return
                } else if (!value) {
                  NotificationManager.error("Please add a description to your proposal");
                  return
                } else if (startDate === "dd/mm/yyyy") {
                  NotificationManager.error("Please add a start date to your proposal");
                  return
                } else if (endDate === "dd/mm/yyyy") {
                  NotificationManager.error("Please add an end date to your proposal");
                  return
                } else if (approvalThreshold === 0) {
                  NotificationManager.error("Your approval threshold cannot be 0%");
                  return
                } else if (tags?.length === 0) {
                  NotificationManager.error("Please add at least one tag to your proposal");
                  return
                } else if (Date.parse(startDate) + 86400000 > (Date.parse(endDate))) {
                  NotificationManager.error(`Your proposal must end at least 1 day after it starts`);
                  return
                }
                setPublishing(true)
                
                if (uniquehash !== "0x0") {
                votingHub?.propose(value, (Date.parse(startDate)/1000), (Date.parse(endDate)/1000), toll, approvalThreshold, generateHexString(32))
                .then((tx: any) => {
                  setCurrentMessage("Proposal is being listed to XDC Voting dApp. Please wait...")
                  try {
                    votingHub?.proposalCount().then((count: any) => {
                      let nextProposal = Number(count);
                      votingHub?.tollBurnPercentage().then((burn: any) => {
                        createProposal({
                          title: title,
                          proposal: nextProposal,
                          tags: tags,
                          description: value,
                          contract: VotingHubAddress.Networks[chainId],
                          creator: account,
                          created: (Date.now()/1000).toString(),
                          opens: (Date.parse(startDate)/1000).toString(),
                          closes: (Date.parse(endDate)/1000).toString(),
                          toll: toll,
                          urls: [],
                          files: [],
                          options: ["YES", "NO", "ABSTAIN"],
                          burnPercentage: Number(burn),
                          burnAddress: "xdc0000000000000000000000000000000000000000",
                          communityPercentage: 100 - Number(burn),
                          communityAddress: "xdc0000000000000000000000000000000000000000",
                          uniqueHash: uniquehash,
                        }).then((res: any) => {
                          if(res.status === 201) {
                            setCurrentMessage("Proposal successfully published. Please wait...")
                            
                            setTimeout(() => {
                              router.push("/")
                              all()
                            }, 1000)
                          }
                      })
                    })
                  })
                  } catch (err) {
                    setCurrentMessage("Failed to list proposal. Please try again." + err)
                  }
                })
                .catch((err: any) => {
                  setCurrentMessage("Failed to publish proposal to the Blockchain. Please try again.")
                  setTimeout(() => {
                    router.push("/")
                  }, 1000)
                })
                } else {
                  setCurrentMessage("Failed to generate unique hash. Please try again.")
                  setTimeout(() => {
                    router.push("/")
                  }, 1000)
                }
              }}>
                <Button icon={publish} text="Publish" />
              </div>
            </div>
          </div>

          {!publishing ? (<div className={styles.inputsContainer}>
            <div className={styles.textInput}>
              <div className={styles.label}>Title</div>

              <div className={styles.input}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>

            <div className={styles.tagInput}>
              <div className={styles.label}>TAG (Optional)</div>

              <div className={styles.input}>
                {treasury == true ? (
                  <div
                    className={styles.tagContainer}
                    onClick={() => setTreasury(!treasury)}
                  >
                    <div className={styles.text}>Treasury</div>

                    <div className={styles.image}>
                      <Image src={less} alt="Remove" />
                    </div>
                  </div>
                ) : null}

                {core == true ? (
                  <div
                    className={styles.tagContainer}
                    onClick={() => setCore(!core)}
                  >
                    <div className={styles.text}>Core</div>

                    <div className={styles.image}>
                      <Image src={less} alt="Remove" />
                    </div>
                  </div>
                ) : null}

                {xdc == true ? (
                  <div
                    className={styles.tagContainer}
                    onClick={() => setXdc(!xdc)}
                  >
                    <div className={styles.text}>XDC Community</div>

                    <div className={styles.image}>
                      <Image src={less} alt="Remove" />
                    </div>
                  </div>
                ) : null}

                {urgent == true ? (
                  <div
                    className={styles.tagContainer}
                    onClick={() => setUrgent(!urgent)}
                  >
                    <div className={styles.text}>Urgent</div>

                    <div className={styles.image}>
                      <Image src={less} alt="Remove" />
                    </div>
                  </div>
                ) : null}
              </div>

              {dropdown == true ? (
                <div className={styles.dropdown}>
                  {treasury == false ? (
                    <div
                      className={styles.tagContainer}
                      onClick={() => setTreasury(true)}
                    >
                      <div className={styles.text}>Treasury</div>

                      <div className={styles.image}>
                        <Image src={more} alt="Add" />
                      </div>
                    </div>
                  ) : null}

                  {core == false ? (
                    <div
                      className={styles.tagContainer}
                      onClick={() => setCore(true)}
                    >
                      <div className={styles.text}>Core</div>

                      <div className={styles.image}>
                        <Image src={more} alt="Add" />
                      </div>
                    </div>
                  ) : null}

                  {xdc == false ? (
                    <div
                      className={styles.tagContainer}
                      onClick={() => setXdc(true)}
                    >
                      <div className={styles.text}>XDC Community</div>

                      <div className={styles.image}>
                        <Image src={more} alt="Add" />
                      </div>
                    </div>
                  ) : null}

                  {urgent == false ? (
                    <div
                      className={styles.tagContainer}
                      onClick={() => setUrgent(true)}
                    >
                      <div className={styles.text}>Urgent</div>

                      <div className={styles.image}>
                        <Image src={more} alt="Add" />
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className={styles.inputRow}>
              <div className={styles.startDate}>
                <div className={styles.label}>Start Date</div>

                <div className={styles.input}>
                  <input type="date" value={startDate} onChange={(e) => {
                    setStartDate(e.target.value)
                  }} />
                </div>
              </div>

              <div className={styles.endDate}>
                <div className={styles.label}>End Date</div>

                <div className={styles.input}>
                  <input type="date" value={endDate} onChange={(e) => {
                    setEndDate(e.target.value)
                  }} />
                </div>
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.votingToll}>
                <div className={styles.label}>Voting Toll</div>

                <div className={styles.input}>
                  <input
                    type="number"
                    alt="Min: 0 XDC Max: 100000 XDC"
                    value={toll}
                    onChange={(e) => {
                      let votingToll = e.target.value
                      if (parseInt(votingToll) < 0) return;
                      setToll(parseInt(votingToll))
                    }}
                  />
                </div>
              </div>

              <div className={styles.sliderInput}>
                <div className={styles.label}>Approval Threshold</div>

                <div className={styles.input}>
                  <Slider
                    aria-label="Voting Toll"
                    defaultValue={approvalThreshold}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                    onChange={(e, value: any) => {
                      setApprovalThreshold(value.valueOf())
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.sliderInput}>


              <div
                className={styles.input}
                data-color-mode={theme === Theme.DARK ? "dark" : "light"}
              >
                <MDEditor
                  value={value}
                  onChange={(text) => setValue(text || "")}
                  height={350}
                />
              </div>
            </div>

            <div className={styles.bottomInputs}>
              <LinkInput handleRenderNumber={handleRenderNumberLink} />
              {Array.from({ length: renderNumberLink }).map((_, i) => (
                <LinkInputRemovable
                  key={i}
                  handleRenderNumber={handleRemoveNumberLink}
                />
              ))}

              {/* <ImageInput handleRenderNumber={handleRenderNumberImage} />
              {Array.from({ length: renderNumberImage }).map((_, i) => (
                <ImageInputRemovable
                  key={i}
                  handleRenderNumber={handleRemoveNumberImage}
                />
              ))} */}
            </div>
          </div>
          ) : (
          <div className={styles.inputsContainer}>
            <div className={styles.bottomInputs}>
              <div className={styles.loader}>
                <Image src={rotatingArrow} alt="Publishing" />
              </div>
              <span className={styles.label}>
                {currentMessage}
              </span>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalEditorComponent;
