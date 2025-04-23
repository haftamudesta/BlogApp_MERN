import { Button } from "flowbite-react"

const About = () => {
  return (
    <div>
      <div>
        <div>
          <h1 className="text-2xl text-blue-800">About haftamu Desta</h1>
          <div>
             <p className="text-xl text-slate-500">Profetionaly am full stack developer and Electrical Engineer.For farther information visit my profiles.
            </p>
            <div className="flex flex-col w-60 ">
               <Button gradientDuoTone='purpleToBlue' className="rounded-tl-xl rounded-bl-none mt-6 mb-8 sm:min-w-20">
                        <a href="https://www.linkedin.com/in/haftamudesta/" target="_blank" role="noopner noreferrer" rel="noreferrer">View my LinkedIn profile</a>
                </Button>
                <Button gradientDuoTone='purpleToBlue' className="rounded-tl-xl rounded-bl-none mt-6 mb-8">
                        <a href="https://github.com/haftamudesta" target="_blank" role="noopner noreferrer" rel="noreferrer">View my GitHub profile</a>
                </Button>
                <Button gradientDuoTone='purpleToBlue' className="rounded-tl-xl rounded-bl-none mt-6 mb-8">
                        <a href="https://github.com/haftamudesta" target="_blank" role="noopner noreferrer" rel="noreferrer">View my FaceBook profile</a>
                </Button>
               </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About