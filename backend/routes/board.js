const {Team, Board, User} = require("../lib/sequelize");

exports.getBoard = async (io, data, action) => {
    const {id} = data;
    try {
        const user = await User.findByPk(parseInt(id));
        if (!user) io.emit(action, {errors: 'user is not exist'});
        let boards = await user.getBoards();
        const teams = await user.getTeams();
        for await (const team of teams) {
            const tboards = await team.getBoards();
            boards = [...boards, ...tboards];
        }
        io.emit(action, {boards});
    }catch(err) {
        io.emit(action, {errors: err});
    }
};

exports.createBoard = async (io, data, action) => {
    const {isTeamBoard, name, id, idTeam = null} = data;
    if (isTeamBoard) {
        try {
            const team = await Team.findById(parseInt(idTeam));
            if (!team) return io.emit(action, {errors: 'team is not exist'});
            const board = await team.createBoard({name, ownerIsTeam: isTeamBoard, userId: null, teamId: idTeam});
            io.emit(action, {board})
        } catch (err) {
            io.emit(action, {errors: err});
        }
    } else {
        try {
            const user = await User.findById(parseInt(id));
            if (!user) io.emit(action, {errors: 'user is not exist'});
            const board = await user.getBoards().filter(board => board.name === name && !board.ownerIsTeam);
            if (board.length) return io.emit(action, {errors: 'board with the same name is exist'});
            const newBoard = await user.createBoard({name, ownerIsTeam: isTeamBoard, userId: id, teamId: null});
            io.emit(action, {board: newBoard});
        } catch(err) {
            io.emit(action, {errors: err})
        }
    }
};

exports.delete = async (io, data, action) => {
    const {idBoard, id} = data;

    try {
        const board = await Board.findById(parseInt(idBoard));
        if (!board) return io.emit(action, {errors: 'board is not exist'});
        await board.destroy();
        io.emit(action, {message: 'board has been destoyed', id: idBoard});
    } catch(err) {
        console.log(err);
        io.emit(action, {errors: err})
    }
};