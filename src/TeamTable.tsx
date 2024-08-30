import type { Component } from "solid-js";

import { For } from "solid-js";
import styles from "./App.module.css";
import MemberItem from "./MemberItem";

type Member = { id: number; name: string; loses: number };

type MemberWithChance = Member & { chance: number };

type TeamTableProps = {
  membersWithChances: Array<MemberWithChance>;
  winner: Member | undefined;
  addMember: (name: string) => void;
  removeMember: (id: number) => void;
};

let input: HTMLInputElement | undefined;
const TeamTable: Component<TeamTableProps> = (props) => {
  const addMemberFromInput = () => {
    if (!input?.value.trim()) return;
    props.addMember(input.value);
    input.value = "";
  };

  return (
    <div class={styles.teamTable}>
      <For each={props.membersWithChances}>
        {(member) => (
          <MemberItem
            member={member}
            isWinner={member.id === props.winner?.id}
            removeMember={props.removeMember}
          />
        )}
      </For>
      <input
        ref={input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addMemberFromInput();
          }
        }}
      />
      <button
        onClick={() => {
          addMemberFromInput();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default TeamTable;
