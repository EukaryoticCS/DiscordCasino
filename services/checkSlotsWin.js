function checkSlotsWin(bet, interaction,slots){
    if(slots[0] <=3 && slots[1] <=3 && slots[2] <=3){
        interaction.message.flow({content: "You won with Triple Cherries! :cherries: :cherries: :cherries:", components: []});
        return bet * 2;
    }
    if(slots[0]>3 &&slots[1]>3 &&slots[2]>3 && slots[0]<=6&&slots[1]<=6 && slots[2]<=6){
        interaction.message.edit({content: ":partying_face: A Bells win??? NO WAY! :partying_face: ", components: []});
        return bet * 3;
    }
    if(slots[0]>=7 && slots[1]>=7 && slots[1]>=7 && slots[0]<=8 && slots[1]<=8 && slots[0]<=8){
        interaction.message.edit({content: ":scream::skull::tada:**TRIPLE RINGS!!!** :tada::skull: :scream:", components: []});
        return bet * 4;
    }
    if(slots[0]==9 && slots[1]==9 && slots[2]==9){
        interaction.message.edit({content: ":skull: **¡¡MEGAWIN!!** :skull:", components: []});
        return bet * 8;
    }
    else{
        interaction.message.edit({content: "You won nothing. Try Again", components: []});
        return 0;
    }

}

module.exports = {checkSlotsWin};