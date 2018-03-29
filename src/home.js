import React from 'react';
import ShowPost from './showpost';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state ={data:[],
                 toggle:0}
    
    this.changelatestorder = this.changelatestorder.bind(this)
    this.changeoldestorder = this.changeoldestorder.bind(this) 
    this.changecommentedorder = this.changecommentedorder.bind(this)
    this.getpost = this.getpost.bind(this);

  } 

   changelatestorder(){
     this.setState({toggle:0})
   }
  
    changeoldestorder(){
     this.setState({toggle:1}) 
   }
   
    changecommentedorder(){
     this.setState({toggle:2}) 
   }

    getpost()
    {
      let hi =  {
      method: "POST",
      headers: {
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
        }
        
        fetch("http://localhost:8080/post/getall",hi)
        .then((response) => {console.log('Success:', response.ok);
                             return response.json();}) 
        .catch(error => console.error('Error:', error))
        .then(response => {if(response !== null)
                           this.setState({data : response});
                           console.log("data",this.state.data)  
                          })
    }

  componentWillMount(){   
      this.getpost();
  }

  componentRecieveProps(newprops)
  {
    this.getpost();
  }

  render() {
    return (
      <div>{console.log("inside render")}
        <meta charSet="utf-8" />
        <title>Home</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
                <div className="post_div">
                  <div className="post_list">
                    <ul>
                      <div onClick = {this.changelatestorder}><li><a><span className="list_img"><img src="/images/img_1.png" /></span>Latest First</a></li></div>
                      <div onClick = {this.changeoldestorder}><li><a><span className="list_img"><img src="/images/img_2.png" /></span>Oldest First</a></li></div>
                      <li><a><span className="list_img"><img src="/images/img_3.png" /></span>Most Pet</a></li>
                      <li><a><span className="list_img"><img src="/images/img_4.png" /></span>Most Clicks</a></li>
                      <div onClick = {this.changecommentedorder}><li><a><span className="list_img"><img src="/images/img_5.png" /></span>Most Commented</a></li></div>
                    </ul>
                  </div>
                  <div className="post_txt">4 New Post Updates</div>
                </div>
              </div>
              { this.state.toggle===0?
                this.state.data.map(obj => <ShowPost info = {obj} /> ).reverse():
                this.state.toggle===1?
                this.state.data.map(obj => <ShowPost info = {obj} /> ):
                this.state.data.sort(function(a,b){return b.comment.length - a.comment.length}).map(obj => <ShowPost info = {obj} /> )}
            </div>
          
          <div className="clear" />
        </div>
      
    )
  }
}

export default Home;