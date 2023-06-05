/*
    Author : Guillaume Théret
    Date : 05-06-2023
    Description : Get op.gg link from team link amazonUniversity

*/

const getOpGG = async () => {
  // get team name from link
  const teamName = teamLink.split("/")[4];
  const teamData = await fetch(
    `https://api.universityesports.fr/api/v001/showcase/university-esports/equipo/${teamName}`
  ).then((res) => res.json());

  const teamMembers = teamData.returnData.miembros;

  const teamMembersData = await Promise.all(
    teamMembers.map(async (member) => {
      const memberData = await fetch(
        `https://api.universityesports.fr/api/v001/showcase/university-esports/user/profile/${member.username}`
      ).then((res) => res.json());
      return memberData.returnData.profile.gameNicks;
    })
  );

  const nicks = teamMembersData.map((obj) => obj[0].nick);

  // build op.gg link
  //https://www.op.gg/multisearch/euw?summoners=Bouhahahahahaha,%20Rob%C3%A9b%C3%B8u
  const opGGlink = encodeURI(
    `https://www.op.gg/multisearch/euw?summoners=${nicks.join(",")}`
  );

  console.log(opGGlink);
};

const args = process.argv.slice(2);
const teamLink = args[0];
getOpGG(teamLink);
