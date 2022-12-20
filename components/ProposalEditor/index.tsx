import dynamic from "next/dynamic";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Slider from "@mui/material/Slider";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import ImageInput from "./components/ImageInput";
import ImageInputRemovable from "./components/ImageInputRemovable";
import LinkInput from "./components/LinkInput";
import LinkInputRemovable from "./components/LinkInputRemovable";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import { useRouter } from "next/router";
import { Theme, ThemeContext } from "../../contexts/themeContext";
import back from "./assets/back.svg";
import less from "./assets/less.svg";
import more from "./assets/more.svg";
import preview from "./assets/preview.svg";
import publish from "./assets/publish.svg";

const ProposalEditorComponent = () => {
  const { theme } = useContext(ThemeContext);

  const router = useRouter();

  const [value, setValue] = useState("# XDC Proposal Editor");
  const [renderNumberLink, setRenderNumberLink] = useState(0);
  const [renderNumberImage, setRenderNumberImage] = useState(0);
  const [dropdown, setDropdown] = useState(true);
  const [treasury, setTreasury] = useState(false);
  const [core, setCore] = useState(true);
  const [xdc, setXdc] = useState(false);
  const [urgent, setUrgent] = useState(false);

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
    if (core && treasury && xdc && urgent) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
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
              <div className={styles.preview}>
                <div className={styles.image}>
                  <Image
                    src={theme == Theme.DARK ? preview : preview}
                    alt="Preview"
                  />
                </div>

                <div className={styles.text}>Preview</div>
              </div>

              <div className={styles.publish}>
                <div className={styles.image}>
                  <Image
                    src={theme == Theme.DARK ? publish : publish}
                    alt="Publish"
                    width={16}
                  />
                </div>

                <div className={styles.text}>Publish</div>
              </div>
            </div>
          </div>

          <div className={styles.inputsContainer}>
            <div className={styles.textInput}>
              <div className={styles.label}>Title</div>

              <div className={styles.input}>
                <input type="text" />
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
                  <input type="date" />
                </div>
              </div>

              <div className={styles.endDate}>
                <div className={styles.label}>End Date</div>

                <div className={styles.input}>
                  <input type="date" />
                </div>
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.votingToll}>
                <div className={styles.label}>Voting Toll</div>

                <div className={styles.input}>
                  <input
                    type="number"
                    placeholder="Min: 0 XDC Max: 100000 XDC"
                  />
                </div>
              </div>

              <div className={styles.sliderInput}>
                <div className={styles.label}>Minimum Pass Vote</div>

                <div className={styles.input}>
                  <Slider
                    aria-label="Voting Toll"
                    defaultValue={10}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                  />
                </div>
              </div>
            </div>

            <div className={styles.sliderInput}>
              <div className={styles.label}>Approval Threshold</div>

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

              <ImageInput handleRenderNumber={handleRenderNumberImage} />
              {Array.from({ length: renderNumberImage }).map((_, i) => (
                <ImageInputRemovable
                  key={i}
                  handleRenderNumber={handleRemoveNumberImage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalEditorComponent;
