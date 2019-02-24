import * as React from 'react';
import MapContainer from '@components/map/Map';
import Information from '@components/home/Information';


class HomeWrapper extends React.Component {
    state = {
        showGreetings: true
    };

    closeGreetings = () => {
        this.setState({ showGreetings: false });
    }

    render() {
        const { showGreetings } = this.state;
        return(
            <>
                <div className={showGreetings ? "hide-map map-bg" : "map-bg"}>
                    <MapContainer />
                </div>
                <div className={!showGreetings ? "display-none" : "home-greetings"}>
                    <Information handleClickGetStarted={this.closeGreetings} />
                </div>
            </>
        );
    }
}

export default HomeWrapper;