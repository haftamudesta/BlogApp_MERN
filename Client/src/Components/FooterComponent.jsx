import {Footer}  from "flowbite-react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-r-8 border-teal-500 border-r-teal-300">
        <div>
            <div>
                <div>
                <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"><span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Haftamu</span> Blog App</Link>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3">
                    <div>
                    <Footer.Title title="About" />
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href="/projects"
                        target="_blank"
                        rel="noopner noreferrer"
                        >
                            my projects
                        </Footer.Link>
                        <Footer.Link
                        href="/about"
                        target="_blank"
                        rel="noopner noreferrer"
                        >
                            About Me
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Follow Me" />
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href="https://github.com/haftamudesta"
                        target="_blank"
                        rel="noopner noreferrer"
                        >
                            Github
                        </Footer.Link>
                        <Footer.Link
                        href="https://www.linkedin.com/in/haftamudesta/"
                        target="_blank"
                        rel="noopner noreferrer"
                        >
                            LinkdIn
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <Footer.Copyright 
            href="#"
            by="Haftmu's Blog App"
            year={new Date().getFullYear()}
            />
        </div>
    </Footer>
  )
}

export default FooterComponent