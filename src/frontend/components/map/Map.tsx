import * as React from 'react';
import * as I from '@common/interfaces';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {Map, Marker, GoogleApiWrapper, MapProps, } from 'google-maps-react';
import NewPointModal from '@components/modals/NewPointModal';
import { EventPointsThunkDispatch, getAllEventPoints, EventPoint } from '@actions/getAllEventPoints';
import { connect } from 'react-redux';
import ExistingPointModal from '@components/modals/ExistingPointModal';
// import { storeKeyNameFromField } from 'apollo-utilities';
import { ApplicationStore } from '@configs/configureReduxStore';

const styles = ({}: Theme) => createStyles({

});
  

export interface Props extends WithStyles<typeof styles>, MapProps {
    eventPoints: I.Maybe<EventPoint[]>;
    get: () => void;
}

interface State {
    initLat: number;
    initLng: number;
    currentCords: I.Maybe<google.maps.LatLng>;
    isNewPointDialogOpen: boolean;
    currentMarker: string;
    isExistingDialogOpen: boolean;
    description: string;
    startDate: Date;
    creatorName: string;
    expectedMembers: number;
    currentMembers: number;
}

class MapContainer extends React.Component<Props, State> {
    state: State = {
        initLat: 42.39,
        initLng: -72.52,
        currentCords: null,
        isNewPointDialogOpen: false,
        currentMarker: '',
        isExistingDialogOpen: false,
        description: "",
        startDate: new Date(),
        creatorName: "",
        expectedMembers: 0,
        currentMembers: 0,
    };

    static mapDispatchToProps(dispatch: EventPointsThunkDispatch) {
        return { 
            get: () => (
                dispatch(getAllEventPoints()) 
            )
        };
    }

    static mapStateToProps(store: ApplicationStore) {
        return { eventPoints: store.eventsPoints.eventPoints};
    }

    onMarkerClick = (event: any) => {
        this.setState({
            isExistingDialogOpen: true,
            description: event.target.getAttribute("data-description"),
            startDate: event.target.getAttribute("data-startDate"),
            creatorName: event.target.getAttribute("data-user"),
            expectedMembers: event.target.getAttribute("expectedMembers"),
            currentMembers: event.target.getAttribute("currentMembers")            
        });
    }

    componentDidMount()  {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                this.setState({
                    initLat: position.coords.latitude,
                    initLng: position.coords.longitude,
                    currentCords: null,
                    isNewPointDialogOpen: false
                });
              }
            );
        }
        this.props.get();
    }

    componentDidUpdate() {
        
    }

    onMapClick = (_mapProps?: MapProps, _map?: google.maps.Map, event?: any) => {
        console.log("Hello world2.");
        if(!event.latLng){
            return;
        }
        this.setState({
            currentCords: event.latLng,
            isNewPointDialogOpen: true
        });
    }

    onNewClose = () => {
        this.setState({
            currentCords: null,
            isNewPointDialogOpen: false
        });
    }

    onExistingClose = () => {
        this.setState({
            currentMarker: '',
            isExistingDialogOpen: false,
            description: "",
            startDate: new Date(),
            creatorName: "",
            expectedMembers: 0,
            currentMembers: 0,
        });
    }

    render() {
        if (!this.state) return (<p>Loading</p>);
        return (
            <Map 
                mapTypeControl={false}
                streetViewControl={false}
                fullscreenControl={false}
                google={this.props.google} 
                zoom={14}
                center={{
                    lat: this.state.initLat,
                    lng: this.state.initLng
                }}
                onClick={this.onMapClick}
            >
                {
                    this.state.isExistingDialogOpen &&
                    <ExistingPointModal 
                        description={this.state.description}
                        isOpen={this.state.isExistingDialogOpen}
                        currentMembers={this.state.currentMembers}
                        expectedMembers={this.state.expectedMembers}
                        creatorName={this.state.creatorName}
                        onClose={this.onExistingClose}
                        startDate={this.state.startDate}
                    />                                                                                
                }
                {this.props.eventPoints ?
                    this.props.eventPoints.map((current) => {
                        return(<Marker 
                            onClick={this.onMarkerClick}
                            position={new google.maps.LatLng(current.location.lat, current.location.lon)}
                            data-description={current.description}
                            data-eventDate={current.startDate}
                            data-user={current.creator.fullname}
                            data-expected={current.currentMembers}
                            data-current={current.expectedMembers}
                            key={1}
                        />);
                    }) : (<p>Loading...</p>)
                }
                {this.state && this.state.currentCords && 
                    <>
                        <NewPointModal 
                            currentCords={this.state.currentCords}
                            isOpen={true}
                            onClose={this.onNewClose}
                        />
                    </>
                }
            </Map>
        );
      }
    
}

export default GoogleApiWrapper(
        { apiKey: ('AIzaSyB6GoMRBUcO4QK3QvkdCltZUXL1B1uboiM') }
    )(connect(MapContainer.mapStateToProps, MapContainer.mapDispatchToProps)
        (withStyles(styles)(MapContainer))
    );