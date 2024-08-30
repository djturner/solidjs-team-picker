import type { Component } from "solid-js";

import { createSignal, Show } from "solid-js";
import styles from "./App.module.css";
import TeamTable from "./TeamTable";
import ChancesVisualisation from "./ChancesVisualisation";

type Member = { id: number; name: string; loses: number };

const testTeam = [
  { id: 1, name: "Dave", loses: 0 },
  { id: 2, name: "Eddie", loses: 0 },
  { id: 3, name: "Hasan", loses: 0 },
];

const App: Component = () => {
  const [members, setMembers] = createSignal<Member[]>([]);

  const sumLoses = () =>
    members().reduce((sum, member) => sum + member.loses, 0);

  const membersWithChances = () => {
    const totalLoses = sumLoses();
    return members().map((member) => ({
      ...member,
      chance: totalLoses > 0 ? member.loses / totalLoses : 1 / members().length,
    }));
  };

  const [winner, setWinner] = createSignal<Member | undefined>();

  const pickWinner = () => {
    let value = Math.random();
    const picked = membersWithChances().find((member) => {
      value -= member.chance;
      return value < 0;
    });

    const newMembers = members().map((member) => ({
      ...member,
      loses: member.id === picked?.id ? 0 : member.loses + 1,
    }));

    setMembers(newMembers);

    setWinner(picked);
  };

  const addMember = (name: string) => {
    const maxId = members().reduce(
      (last, member) => Math.max(last, member.id),
      0
    );
    const newMember: Member = {
      id: maxId + 1,
      name,
      loses:
        members().length > 0 ? Math.floor(sumLoses() / members().length) : 0,
    };
    setMembers([...members(), newMember]);

    return newMember;
  };

  const removeMember = (id: number) => {
    setMembers([...members().filter((member) => member.id !== id)]);
  };

  let input: HTMLInputElement | undefined;
  return (
    <div class={styles.App}>
      <header class={styles.header}>Team Picker</header>
      <div class={styles.content}>
        <div class={styles.teamInfo}>
          <TeamTable
            membersWithChances={membersWithChances()}
            winner={winner()}
            addMember={addMember}
            removeMember={removeMember}
          />
          <ChancesVisualisation membersWithChances={membersWithChances()} />
        </div>
        <div>
          <Show when={winner()} fallback={"No winner has been chosen"}>
            Winner: {winner()?.name}!
          </Show>
        </div>
        <button onClick={() => pickWinner()}>Pick new winner!</button>
      </div>
    </div>
  );
};

export default App;
