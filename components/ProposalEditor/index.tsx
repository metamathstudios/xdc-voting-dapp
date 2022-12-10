import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './styles.module.scss'

import { TagsInput } from 'react-tag-input-component'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import Slider from '@mui/material/Slider'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
)

import back from './assets/back.svg'
import preview from './assets/preview.svg'
import publish from './assets/publish.svg'
import more from './assets/more.svg'

const ProposalEditorComponent = () => {
  const [selected, setSelected] = useState(['XDC'])

  const [value, setValue] = useState('# XDC Proposal Editor');

  const valuetext = (value: number) => {
    return `${value}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.centerColumn}>
        <div className={styles.userOptions}>
          <div className={styles.backContainer} onClick={() => window.open('/', '_self')}>
            <Image src={back} alt='Back' width={17}/>
            <div className={styles.text} >
              Back
            </div>
          </div>
          
          <div className={styles.rightContainer}>
            <div className={styles.preview}>
              <div className={styles.image}>
                <Image src={preview} alt='Preview' />
              </div>

              <div className={styles.text}>
                Preview
              </div>
            </div>

            <div className={styles.publish}>
              <div className={styles.image}>
                <Image src={publish} alt='Publish' />
              </div>

              <div className={styles.text}>
                Publish
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inputsContainer}>
          <div className={styles.textInput}>
            <div className={styles.label}>
              Title
            </div>

            <div className={styles.input}>
              <input type="text" />
            </div>
          </div>

          <div className={styles.tagInput}>
            <div className={styles.label}>
              TAG (Optional)
            </div>

            <div className={styles.input}>
              <TagsInput
                value={selected}
                onChange={setSelected}
                name='tags'
                placeHolder='Enter tags'
              />
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.startDate}>
              <div className={styles.label}>
                Start Date
              </div>

              <div className={styles.input}>
                <input type='date' />
              </div>
            </div>

            <div className={styles.endDate}>
              <div className={styles.label}>
                End Date
              </div>

              <div className={styles.input}>
                <input type='date' />
              </div>
            </div>

            <div className={styles.votingToll}>
              <div className={styles.label}>
                Voting Toll
              </div>

              <div className={styles.input}>
                <input type='number' placeholder='Min: 0 XDC Max: 100000 XDC' />
              </div>
            </div>
          </div>

          <div className={styles.sliderInput}>
            <div className={styles.label}>
              Minimum Pass Vote
            </div>

            <div className={styles.input}>
              <Slider
                aria-label='Voting Toll'
                defaultValue={10}
                getAriaValueText={valuetext}
                valueLabelDisplay='auto'
                step={10}
                marks
                min={0}
                max={100}
              />
            </div>
          </div>

          <div className={styles.textEditor}>
            <div className={styles.label}>
              Description
            </div>

            <div className={styles.input}>
              <MDEditor value={value} onChange={setValue} />
            </div>
          </div>

          <div className={styles.bottomInputs}>
            <div className={styles.textInput}>
              <div className={styles.label}>
                Link (Optional)
              </div>

              <div className={styles.input}>
                <input type="text" placeholder='https://www.yourlink.com' />
              </div>
            </div>

            <div className={styles.button}>
              <Image src={more} alt='Button' width={15} className={styles.image} />
            </div>
          </div>

          <div className={styles.bottomInputs}>
            <div className={styles.textInput}>
              <div className={styles.label}>
                Upload Document (Optional)
              </div>

              <div className={styles.input}>
                <input type='file'  placeholder='image.png' />
              </div>
            </div>

            <div className={styles.textButton}>
              Browse File
            </div>

            <div className={styles.button}>
              <Image src={more} alt='Button' width={15} className={styles.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalEditorComponent