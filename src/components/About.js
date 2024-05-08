
import TeamClass from "./TeamClass";

const About=()=>{

    return(
        <div className="About-comp">
            <h1 className="About-h1">ABOUT US</h1>
            <p className="About-p" >Welcome to The Food Mood, your ultimate destination for delightful food experiences delivered right to your doorstep. We are passionate about connecting food lovers with a diverse range of culinary delights, curated from the best local restaurants and eateries.</p>

            {/* <h1>OUR MISSION</h1>
            <p className="About-p">At The Food Mood, our mission is simple yet profound: to make ordering food easy, enjoyable, and rewarding for everyone. We strive to provide a seamless platform where you can discover new flavors, satisfy cravings, and support local businesses—all with just a few taps on your phone.</p> */}

    
            <TeamClass  yoe="1 yrs" />


        </div>
        
    );
}



export default About;