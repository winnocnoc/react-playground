import { ChangeEvent, useState } from "react"
import heic2any from "heic2any"

interface InputFile {
  name: string;
  type: string;
  size: number;
}

export const HeicToJpeg = () => {
  const [image, setImage] = useState('')
  const [inputFile, setInputFile] = useState<InputFile>()

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    console.log('file', file)
    setInputFile({
      name: file.name,
      type: file.type,
      size: file.size
    })
    const blob = new Blob([file], { type: file.type })
    const convert = await heic2any({ blob }) as Blob
    const url = URL.createObjectURL(convert)
    setImage(url)
  };

  return (
    <div>
      <input type="file" id="image-upload" onChange={handleChange} />
      <div>
        <img width={200} height={200} src={image} />
        <pre>
          {JSON.stringify(inputFile, null, 2)}
        </pre>
      </div>
    </div>
  )
}
