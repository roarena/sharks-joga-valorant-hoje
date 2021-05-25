import Head from 'next/head'
import Image from 'next/image'

export async function getStaticProps() {
    const res = await fetch('https://brasil-joga-valorant-hoje.vercel.app/api/index?team=sharks')
    const data = await res.json()
    return {
        props: {
            data,
        },
    }
}

export function playToday(status) {
    if (status)
        return <h1><font color="green">Sim</font></h1>
    return <h1><font color="red">Não</font></h1>
}

export function teamLogo(props, team) {
    return <Image
        src={"https://liquipedia.net/" + props.data.images[team]}
        height={30}
        width={30}
        alt={props.data.teams[team] + " Logo"}
    />
}

export function getMatchTime(time) {
    var offsetTime = ((time.split(':')[0] * 60) - new Date().getTimezoneOffset())
    return (offsetTime / 60) + "h" + time.split(':')[1]
}

export default function Home(props) {
    return (
        <div className="w3-content">
            <Head>
                <title>A Sharks joga Valorant hoje?</title>
                <link rel="icon" href="/favicon.ico" />
                <script async defer src="https://buttons.github.io/buttons.js"></script>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway" />
            </Head>
            <style jsx global>{`
                    body,h1 {
                        font-family: 'Raleway', Arial, sans-serif;
                    }
                    h1 {
                        letter-spacing: 6px;
                    }
            `}
            </style>

            <body>
                <center>
                    <Image
                        src="https://liquipedia.net/commons/images/thumb/d/dd/Sharks_Esports.png/600px-Sharks_Esports.png"
                        height={200}
                        width={200}
                        alt={"Sharks Logo"}
                    />
                </center>

                <header className="w3-panel w3-center w3-opacity">
                    <h1>A Sharks joga hoje?</h1>
                    {playToday(props.data.play_today)}
                    <h2>
                        {teamLogo(props, 0)}
                        <a href={"https://liquipedia.net" + props.data.links[0]} target="_blank">{props.data.teams[0]}</a> vs <a href={"https://liquipedia.net" + props.data.links[1]} target="_blank">{props.data.teams[1]}</a>
                        {teamLogo(props, 1)}
                    </h2>
                    <p>Próximo jogo: <u>{props.data.date[0]}</u> aproximadamente às <u>{getMatchTime(props.data.time[0])}</u></p>
                    <p>Informações obtidas no <a href="https://liquipedia.net">Liquipedia</a></p>
                    <p>by Rodrigo "Inkky" Câmara</p>
                    <a className="github-button"
                        href="https://github.com/roarena/sharks-joga-valorant-hoje"
                        data-size="large"
                        data-show-count="true"
                        aria-label="roarena/sharks-joga-valorant-hoje on GitHub">
                        GitHub
                </a>
                    <p><a href="https://twitter.com/_rodrigocamara?ref_src=twsrc%5Etfw"
                        className="twitter-follow-button"
                        data-show-count="false">@_rodrigocamara</a>
                        </p>
                </header>
            </body>
        </div>
    )
}