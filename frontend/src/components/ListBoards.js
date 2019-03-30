import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    dropMessage, emitDropBoard,
    emitGetBoards,
    subscribeDropBoard,
    subscribeGetBoards
} from "../redux/board/actions";
import {Button, Grid, Header, Icon, Message, List} from "semantic-ui-react";
import {emitTeams, subscribeTeams} from "../redux/teams/actions";

class ListBoards extends Component{
    componentWillMount() {
      const {onSubscribeGetBoards, onSubscribeDropBoard, onSubscribeTeams} = this.props;
      onSubscribeGetBoards();
      onSubscribeDropBoard();
      onSubscribeTeams();
    }

    componentDidMount() {
      const {onEmitGetBoards, onEmitTeams, teams} = this.props;
      onEmitGetBoards();
      if (!teams.length) {
        onEmitTeams();
      }
    }

    render(){
        const {boards, message, teams} = this.props;
        const {onEmitDropBoard, ondropMessage} = this.props;

        const teamName = board => teams.length  && board.ownerIsTeam ?  `(${teams.find(t => t.id == board.teamId).name})` : '';
        return (
          <Grid>
              <Message hidden={Object.keys(message).length < 2} onDismiss={ondropMessage}>
                  <Message.Header>{message.info}</Message.Header>
              </Message>
              <Header>Доски</Header>
              <List celled className={"list-teams"}>
                  {boards.map((board, index) => <List.Item key={`item-${index}`}>
                      <List.Content>
                          <List.Header>
                            {board.name}{teamName(board)}
                          </List.Header>
                      </List.Content>
                      <List.Content className={`content-button`}>
                          <Button className={`button-drop-team`} onClick={() => onEmitDropBoard(board.id)}>
                              <Icon name="close"/>
                          </Button>
                      </List.Content>
                  </List.Item>)}
                  <Button className={`button-add`} onClick={() => this.props.history.push('/board/change')}>Создать</Button>
              </List>
          </Grid>
        )
    }
}


export default connect(
    state => ({
        boards  : state.board.boards,
        message : state.board.message,
        teams   : state.teams.teams,
    }),
    dispatch => ({
      onSubscribeTeams: () => dispatch(subscribeTeams()),
      onEmitTeams: () => dispatch(emitTeams()),
      onSubscribeGetBoards: () => dispatch(subscribeGetBoards()),
      onEmitGetBoards: () => dispatch(emitGetBoards()),
      onSubscribeDropBoard: () => dispatch(subscribeDropBoard()),
      onEmitDropBoard: (id) => dispatch(emitDropBoard(id)),
      ondropMessage: () => dispatch(dropMessage())
    })
)(ListBoards);