import React from 'react';
import axios from 'axios';
import InfoBox from './infobox';
import Hours from './hours';
import MoreInfo from './moreinfo';
import Styled from 'styled-components';
import { throws } from 'assert';

const Div = Styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
`;


class RestaurantInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: 0,
            isOpen: '',
            hours: [
                {start: '9:00 am', end: '8:00 pm'},
                {start: '9:00 am', end: '8:00 pm'},
                {start: '9:00 am', end: '8:00 pm'},
                {start: '9:00 am', end: '8:00 pm'},
                {start: '9:00 am', end: '8:00 pm'},
                {start: '9:00 am', end: '11:00 pm'},
                {start: '11:00 am', end: '5:30 pm'},
            ],
            //have to make default states for all the data
            restaurant: {
                id: "",
                name: "",
                price_range: "",
                menu: "",
                is_closed: null,
                url: "",
                price: "",
                health_score: "",
                more_info: [],
                hours:
                  {
                    hours_type: "",
                    open: [
                      {  is_overnight: null, end: "", day: 0, start: "" },
                      {  is_overnight: null, end: "", day: 1, start: "" },
                      {  is_overnight: null, end: "", day: 2, start: "" },
                      {  is_overnight: null, end: "", day: 3, start: "" },
                      {  is_overnight: null, end: "", day: 4, start: "" },
                      {  is_overnight: null, end: "", day: 5, start: "" },
                      {  is_overnight: null, end: "", day: 6, start: "" },
                      {  is_overnight: null, end: "", day: 7, start: "" },
                    ],
                    is_open_now: null,
                  },

              }
        }
        this.getDate = this.getDate.bind(this);
        this.showHours = this.showHours.bind(this);
        this.populateData = this.populateData.bind(this);
    }

    populateData(){
        axios
        .post('http://localhost:3005/api/restaurantList')
        .catch(err => {console.log('nononono Post'); console.error(err);})
    }

    getDate(){
        var d = new Date();
        var n = d.getDay();
        var timeOfDay = (d.getHours() * 100) + d.getMinutes();
        if (timeOfDay > this.state.restaurant.hours.open[n].start && timeOfDay < this.state.restaurant.hours.open[n].end)
        { this.setState({isOpen: 'Open now'}); }
        else
        { this.setState({isOpen: 'Closed now'}); }

        this.setState({date: n});
    }

    showHours(){
        this.setState({hours: []});
        this.state.restaurant.hours.open.forEach(day => {
            //parse the hours
            var dayStart = day.start;
            var dayEnd = day.end;

            //accounting for single digit hours

            if (day.start % 1200 >= 1)
            {
                dayStart -= 1200;
                dayStart = dayStart.toString();

                var startH = 2;
                if (dayStart.length === 3){startH = 1}
    
                dayStart = [dayStart.slice(0,startH) + ":" + dayStart.slice(startH,startH + 2) + " pm"].join('');
            }
            else
            {
                dayStart = dayStart.toString();

                var startH = 2;
                if (dayStart.length === 3){startH = 1}
    
                dayStart = [dayStart.slice(0,startH) + ":" + dayStart.slice(startH,startH + 2) + " am"].join('');
            }

            if (day.end % 1200 >= 1)
            {
                dayEnd -= 1200;
                dayEnd = dayEnd.toString();

                var endH = 2;
                if (dayEnd.length === 3){endH = 1}
    
                dayEnd = [dayEnd.slice(0,endH) + ":" + dayEnd.slice(endH,endH + 2) + " pm"].join('');

            }
            else
            {
                dayEnd = dayEnd.toString();

                var endH = 2;
                if (dayEnd.length === 3){endH = 1}

                dayEnd = dayEnd.splice(2,0,':');
                dayEnd = [dayEnd.slice(0,2) + ":" + dayEnd.slice(2,4) + " am"].join('');
            }

            var arr = this.state.hours.concat({start: dayStart, end: dayEnd});
            this.setState({hours: arr});
        });
    }

    componentWillMount(){
        axios
            // .get('http://localhost:3005/api/restaurantList/Alfredo')
            // put in correct aws instance in get url--
            // .get('http://ec2-54-241-142-239.us-west-1.compute.amazonaws.com:9000/api/restaurantList/Awesome%20Sauce')
            .get('/api/restaurantList/Awesome%20Sauce')
            .then(result => {
                console.log(result.data)
                result.data['more_info'] = [
                  {"property":"delivery", "value": "No"},
                  {"property":"take_out", "value": "Yes"},
                  {"property":"credit_cards", "value": "Yes"},
                  {"property":"parking", "value": "Valet, Garage, Street, Private Lot"},
                  {"property":"bike_parking", "value": "Yes"},
                  {"property":"good_for_kids", "value": "Yes"},
                  {"property":"good_for_groups", "value": "Yes"},
                  {"property":"wi_fi", "value": "Free"}
                ]
                this.setState({
                    restaurant: result.data,
                });
                this.getDate();
                this.showHours();
            })
            .catch(err => {
                this.populateData().then(() => {
                    axios
                    .get('http://localhost:3005/api/restaurantList', {params: {restaurant: 'Gary Danko'}})
                    .then(result => {
                        this.setState({
                            restaurant: result.data[0],
                        });
                        this.getDate();
                        this.showHours();
                })
            }); 
            console.log('nononono'); console.error(err);})
    }


    render(){
        return (
            <Div>
                {/* UNCOMMENT THE BUTTON BELOW TO POPULATE DATA */}
                {/* <button onClick={this.populateData}> Populate Data </button> */}
                <InfoBox 
                    date={this.state.date} 
                    restaurant={this.state.restaurant} 
                    hours={this.state.hours}
                    isOpen={this.state.isOpen}
                    showHours={this.showHours}
                />
                <br />
                <div>
                    <Hours 
                        name = {this.state.restaurant.name}
                        hours={this.state.hours}
                    />
                    <br />
                    <br />
                    <MoreInfo 
                        restaurant={this.state.restaurant}
                    />
                    <div>
                    </div>
                </div>
            </Div>

        ) 
    }
}

export default RestaurantInfo;