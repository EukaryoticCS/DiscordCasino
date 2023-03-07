function checkSlotsWin(bet, interaction){
    if(Spin()[0] <=3 && Spin()[1] <=3 && Spin() <=3){
        interaction.message.flow({content: "You won with Triple Cherries! :cherries: :cherries: :cherries:", components: []});
        return bet * 2;
    }
    if(Spin([0])>3 &&Spin([1])>3 &&Spin([2])>3 && Spin([0])<=6&&Spin([1])<=6 && Spin([2])<=6){
        interaction.message.edit({content: ":partying_face: A Bells win??? NO WAY! :partying_face: ", components: []});
        return bet * 3;
    }
    if(Spin([0])>=7 && Spin([1])>=7 && Spin([2])>=7 && Spin([0])<=8 && Spin([1])<=8 && Spin([2])<=8){
        interaction.message.edit({content: ":scream::skull::tada:**TRIPLE RINGS!!!** :tada::skull: :scream:", components: []});
        return bet * 4;
    }
    if(Spin([0])==9 && Spin([1])==9 && Spin([2])==9){
        interaction.message.edit({content: ":skull: **¡¡MEGAWIN!!** :skull:", components: []});
        return bet * 8;
    }
    else{
        interaction.message.edit({content: "You won nothing. Try Again", components: []});
        return 0;
    }
}

module.exports = {checkSlotsWin};