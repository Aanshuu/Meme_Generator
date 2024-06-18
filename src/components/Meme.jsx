import React from "react"
export default function Meme(){
    
    // const[memeImage, setMemeImage] = React.useState("http://i.imgflip.com/1bij.jpg")
    const[meme, setMeme]= React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const[allMemeImages, setAllMemeImages]= React.useState([])
    
    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        setMeme(prevMeme => {
            return{
                ...prevMeme,
                randomImage: allMemeImages[randomNumber].url
            }
        })
    }

    //Api fetching ways
    
    // React.useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(data => setAllMemeImages(data.data.memes))
    // }, [])

    const getImg = async () => {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json()
        setAllMemeImages(data.data.memes)
    }

    React.useEffect(() => {
        Promise.all(getImg())
    }, [])


    function handelChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => {
            return{
                ...prevMeme,
                [name]: value
            }
        })
    }
    // implicit return = setMeme(prevMeme => ({}))
    return(
        <main>
            <div className="form">
                <form>
                    <input 
                        type="text" 
                        className="form-input-first" 
                        placeholder="Top text"
                        name="topText"
                        value={meme.topText}
                        onChange={handelChange}
                    />
                </form>
                <div>
                    <input 
                        type="text" 
                        className="form-input-second" 
                        placeholder="Bottom text"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handelChange}
                    />
                </div>
                <button 
                    onClick={getMemeImage}  
                    className="form-button">Get a new meme image
                </button>
            </div> 
            <div className="meme">
                <img src={meme.randomImage} className="meme-image"/>
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>

        </main>
    )
}