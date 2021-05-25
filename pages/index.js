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
    var imagePath = "https://liquipedia.net/" + props.data.images[team]
    return <Image
        src={imagePath}
        height={30}
        width={30}
        alt={props.data.teams[team] + " Logo"}
    />
}

export function getMatchTime(time) {
    var offsetTime = ((time.split(':')[0] * 60) - new Date().getTimezoneOffset())
    return (offsetTime / 60) + ":" + time.split(':')[1] + ":" + time.split(':')[2]
}

export default function Home(props) {
    return (
        <div className="w3-content">
            <Head>
                <title>Sharks joga hoje?</title>
                <link rel="icon" href="/favicon.ico" />
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
            `}</style>

            <header class="w3-panel w3-center w3-opacity">
                <h1>A Sharks joga hoje?</h1>
                {playToday(props.data.play_today)}
                <h2>{teamLogo(props, 0)} <a href={"https://liquipedia.net" + props.data.links[0]} target="_blank">{props.data.teams[0]}</a> vs <a href={"https://liquipedia.net" + props.data.links[1]} target="_blank">{props.data.teams[1]}</a> {teamLogo(props, 1)}</h2>
                Próximo jogo: {props.data.date[0]} aproximadamente às ({getMatchTime(props.data.time[0])})<br></br>
                Informações obtidas no <a href="https://liquipedia.net">Liquipedia</a>
                <p>by Rodrigo "Inkky" Câmara</p>
            </header>
        </div>
    )
}