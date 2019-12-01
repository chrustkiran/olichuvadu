import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Badge, Button, Radio, Col, Card } from 'antd';
import 'antd/dist/antd.css';
import CSVCard from '../csv_card/CSVCard';
import Papa from 'papaparse';
import { environment } from '../environment';



export default class Selector extends React.Component{

 
    state = {
        heading: 'heading2',
        items : [],
    
      };
    
      fetchCsv(uri) {
          var data = [];
          const { Meta } = Card;
          console.log(uri);
        Papa.parse(uri, {
            download: true,
            credentials: "same-origin", //include, same-origin
            headers: {Accept: 'application/json', 'Content-Type': 'application/json',},
           complete: function(results) {
               //console.log(results.data);
               //console.log(results.data[1][6]);
                data = results.data.map((item) =>
                  item[0] != "id" ?<div> <Card
                  style={{ width: 300 }}
                  cover={
                    <img 
                      src= {"//drive.google.com/uc" + item[6].substring(29)}
                    ></img> }
                  actions={[
                    <Button onClick = {()=> this.openInNewTab(item[6])} type="primary" ghost>
                   View this photo
                  </Button>

                
                  ]}
                >
                  <Meta

                    title={item[1]}
                    description={item[4]}
                  />
                </Card> <br></br></div> : <div></div>
                   
                  )
                this.setState({items : data})
              
           }.bind(this)
       });
    }


    openInNewTab = link =>{
      window.open(link, "_blank")
    }


      handleSizeChange = e => {
        this.setState({items: []});
        this.setState({ heading: e.target.value }, ()=>{
          this.fetchCsv(environment[this.state.heading]);

        }
          ) 
       
      };

      componentDidMount(){
        //environment.heading1
        this.fetchCsv(environment[this.state.heading]);
      }


    render(){
       
        
    
        const items  = this.state.items;
        const heading = this.state.heading;
        return(




            <div>
                 <Col span={12} offset={6}>
                     <div style={{textAlign: 'center'}}>
            <Radio.Group value={heading} onChange={this.handleSizeChange}>
          <Radio.Button value="heading1">மானுட சந்தை</Radio.Button>
          <Radio.Button value="heading2">இயற்கையும் செயற்கையும்</Radio.Button>
          <Radio.Button value="heading3">இன்றைய சூழலில் பெண்ணியம்</Radio.Button>
        
        </Radio.Group>
    
    
       <Row>
         <br></br>
  <Col md={{span: 12, offset: 6}}>
      <div style={{textAlign: 'center'}}>
        {items}
       </div>
    </Col>
  </Row>

    
        </div>
        </Col>

          </div>
        );


}
}