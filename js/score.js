var Score = {
    // please fill in your name and NetID
    // your NetID is the part of your email before @princeton.edu
    'score'  : '0',
};

Score.updateScore = function( score ) {
    // var studentInfo = this.name + ' &lt;' + this.netID + '&gt;';
    document.getElementById('score').innerHTML = "Your Score is: " + score;
}
