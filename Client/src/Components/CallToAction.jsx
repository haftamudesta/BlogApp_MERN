import { Button } from "flowbite-react"

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row border p-3 border-teal-400 justify-center">
        <div className="flex-1">
                <h1 className="text-6xl ml-10 mb-8 text-slate-900">Welcome to my Blog</h1>
                <p className="text-3xl text-red-400">In case you want to see projects which I have implemented I kindly request you to visit my GitHub acount </p>
               <div className="flex flex-col w-60 ">
               <Button gradientDuoTone='purpleToBlue' className="rounded-tl-xl rounded-bl-none mt-6 mb-8 sm:min-w-20">
                        <a href="https://www.linkedin.com/in/haftamudesta/" target="_blank" role="noopner noreferrer" rel="noreferrer">View my LinkedIn profile</a>
                </Button>
                <Button gradientDuoTone='purpleToBlue' className="rounded-tl-xl rounded-bl-none">
                        <a href="https://github.com/haftamudesta" target="_blank" role="noopner noreferrer" rel="noreferrer">View my GitHub profile</a>
                </Button>
               </div>
        </div>
        <div className="flex-1">
                <img src="https://developers.redhat.com/sites/default/files/styles/article_feature/public/nodejs-reference-architecture_2x.png?itok=IADzXWmx" alt="node js" />
        </div>
    </div>
  )
}

export default CallToAction