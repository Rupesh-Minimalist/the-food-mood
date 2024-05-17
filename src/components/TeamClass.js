import React from "react";

class TeamCLass extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        Points:0,
        GitInfo:"" 
    }

  }

  async componentDidMount(){
    let response=await fetch("https://api.github.com/users/Rupesh-Minimalist");
    let ActualData=await response.json();

    console.log(ActualData);
    this.setState({
        GitInfo:ActualData
    })
  }

  render() {
    const {yoe} = this.props;                   // Destructuring or this.props.Name
    const {Points}=this.state;                   // Destructuring or this.state.Points
    const {name,location,avatar_url}=this.state.GitInfo;

    return (
      <>
        <div>
          <div className="absolute left-2/4 -translate-x-2/4 p-5  bg-slate-200 rounded-xl mt-5">
            <img className="m-auto" src={avatar_url} width="200px"></img>
            <h3>Name: {name}</h3>
            <h4>Location: {location}</h4>
            {/* <h4>Email: {mail}</h4> */}
            <h4>YOE: {yoe}</h4>
            <p>Up Votes: {Points}</p>
            <button className="px-1 bg-slate-100 rounded-xl"
              onClick={() => {
                this.setState({
                    Points:Points+1
                })
              }}
            >RATE</button>
          </div>
        </div>
      </>
    );
  }
}

export default TeamCLass;
