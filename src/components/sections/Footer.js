import '../../App.css'

import { Link } from 'react-router-dom'

import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiMongodb, SiHeroku } from 'react-icons/si'
import { IoLogoVercel } from 'react-icons/io5'
import { FiTwitter, FiGithub, FiTriangle } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'

import Sparkles from '../hooks/Sparkles'

const Footer = ({ className }) => {
    return (
        <footer
            style={{
                opacity: '.99',
                display: 'grid',
                gridTemplateColumns: 'auto',
                gridTemplateRows: '24px auto auto'
            }}
            className={`${className}`}
        >
            <div
                className={`row-start-1 row-end-3 col-start-1 z-10 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-4 sm:mx-auto`}
            >
                <Sparkles>
                    <p
                        className={`text-xl text-purple-600 font-bold text-center`}
                    >
                        Posty is a web application built to simulate a
                        multi-user blogging platform. Had a lot of fun building
                        this one.
                    </p>
                </Sparkles>
            </div>
            <div
                className={`row-start-2 row-end-4 col-start-1 bg-purple-900`}
            ></div>

            <div
                className={`row-start-3 row-end-4 col-start-1 bg-purple-900 flex justify-center items-start`}
            >
                <div
                    className={`m-4 mt-12 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex-1`}
                >
                    <div
                        className={`flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-start`}
                    >
                        <Link
                            className={`font-bold text-yellow-500 flex items-center text-4xl`}
                            to='/'
                        >
                            <FiTriangle className={`mr-1 `} />
                            <span className={`text-3xl`}>Posty</span>
                        </Link>
                        <span>
                            <h4
                                className={`text-xl font-semibold text-purple-500`}
                            >
                                Tech stack
                            </h4>
                            <ul
                                className={`text-purple-100 list-none space-y-1 mt-2`}
                            >
                                <li className={`flex items-center`}>
                                    <FaReact className={`mr-1`} />
                                    React
                                </li>
                                <li className={`flex items-center`}>
                                    <FaNodeJs className={`mr-1`} />
                                    Node
                                </li>
                                <li className={`flex items-center`}>
                                    <span
                                        className={`mr-1 border border-purple-100 p-2 rounded-full w-4 h-4 text-xs flex justify-center items-center`}
                                    >
                                        ex
                                    </span>
                                    <span>Express</span>
                                </li>
                                <li className={`flex items-center`}>
                                    <SiMongodb className={`mr-1`} />
                                    MongoDB
                                </li>
                            </ul>
                        </span>
                        <span>
                            <h4
                                className={`text-xl font-semibold text-purple-500`}
                            >
                                Hosting
                            </h4>
                            <ul
                                className={`text-purple-100 list-none space-y-1 mt-2`}
                            >
                                <li className={`flex items-center`}>
                                    <IoLogoVercel className={`mr-1`} />
                                    Vercel
                                </li>
                                <li className={`flex items-center`}>
                                    <SiHeroku className={`mr-1`} /> Heroku
                                </li>
                            </ul>
                        </span>
                        <span>
                            <h4
                                className={`text-xl font-semibold text-purple-500`}
                            >
                                Developer
                            </h4>
                            <ul
                                className={`text-purple-100 list-none space-y-1 mt-2`}
                            >
                                <li className={`flex items-center`}>
                                    <FiTwitter className={`mr-1`} />
                                    <a
                                        className={`border-b-4 border-yellow-500 `}
                                        target='_blank'
                                        rel='noreferrer'
                                        href={`https://twitter.com/00mikhael`}
                                    >
                                        @00mikhael
                                    </a>
                                </li>
                            </ul>
                        </span>
                    </div>
                    <div
                        className={`flex justify-between flex-wrap border-t border-purple-500 mt-4 pt-4 text-purple-300 pb-20`}
                    >
                        <small>
                            With <AiOutlineHeart className={`inline`} /> from{' '}
                            <FiGithub className={`inline`} />{' '}
                            <a
                                className={`border-b-4 border-yellow-500 text-purple-500  `}
                                target='_blank'
                                rel='noreferrer'
                                href='https://github.com/00mikhael/react-post-app'
                            >
                                Frontend
                            </a>{' '}
                            <FiGithub className={`inline`} />{' '}
                            <a
                                className={`border-b-4 border-yellow-500 text-purple-500 `}
                                target='_blank'
                                rel='noreferrer'
                                href='https://github.com/00mikhael/app-server'
                            >
                                Backend
                            </a>
                        </small>
                        <small>&copy;2021 Posty </small>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
