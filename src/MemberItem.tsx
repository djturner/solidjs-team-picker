import { Show } from "solid-js";
import type { Component } from "solid-js";
import { FontAwesomeIcon } from "solid-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import styles from "./App.module.css";

library.add(fas);

type MemberItemProps = {
  member: {
    id: number;
    name: string;
    loses: number;
    chance: number;
  };
  isWinner: boolean;
  removeMember: (id: number) => void;
};

const MemberItem: Component<MemberItemProps> = (props) => {
  return (
    <div class={styles.memberItem}>
      <Show when={props.isWinner}>
        <FontAwesomeIcon icon={"fa-trophy"} />
        &nbsp;
      </Show>
      {props.member.name} - {`${Math.round(props.member.chance * 1000) / 10}%`}{" "}
      (streak: {props.member.loses})
      <Show when={props.isWinner}>
        &nbsp;
        <FontAwesomeIcon icon={"fa-trophy"} />
      </Show>
      &nbsp;
      <button onClick={() => props.removeMember(props.member.id)}>
        {/* <FontAwesomeIcon icon={"fa-xmark"} /> */}
        Remove
      </button>
    </div>
  );
};

export default MemberItem;
