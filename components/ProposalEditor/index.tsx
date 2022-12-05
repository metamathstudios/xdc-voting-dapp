import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './styles.module.scss'

import { TagsInput } from 'react-tag-input-component'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import back from './assets/back.svg'
import preview from './assets/preview.svg'
import publish from './assets/publish.svg'
import more from './assets/more.svg'

const ProposalEditorComponent = () => {
  const [selected, setSelected] = useState(['XDC'])
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  )
  function onChange (editorState: any) {
    setEditorState({
      editorState
    })
  }

  const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  )

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

          <div className={styles.textEditor}>
            <div className={styles.label}>
              Description
            </div>

            <div className={styles.input}>
              <Editor editorState={editorState} />
            </div>
          </div>

          <div className={styles.bottomInputs}>
            <div className={styles.textInput}>
              <div className={styles.label}>
                Link (Optional)
              </div>

              <div className={styles.input}>
                <input type="text" placeholder='https://www.link.com' />
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