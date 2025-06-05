import { useState } from "react";

function TodoList() {
  const [task, setTask] = useState("");
  //   할일 목록 배열 저장
  const [taskList, setTaskList] = useState([]);
  //   console.log(taskList);

  //   console.log(task);
  //   할일을 추가하는 함수
  function handleAdd() {
    // 입력창이 비어있거나 공백만 있을 경우 아무것도 하지 않는다.
    if (task.trim() === "") return;
    // alert("추가");
    const newTask = {
      id: Date.now(),
      text: task, //입력되는 텍스트 (할일)
      date: new Date().toLocaleString(), //현재 날짜 / 시간을 문자열로 저장
      done: false, // 처음에는 완료되지 않은 상태
    };
    // console.log(newTask);

    // 기존 할일 목록에 할 일을 추가
    setTaskList([...taskList, newTask]);
    setTask("");
  }
  function toggleDone(id) {
    console.log(id);
    setTaskList(
      taskList.map((t) => {
        console.log(t);
        return t.id === id ? { ...t, done: !t.done } : t;
      })
    );
  }
  function handleDelete(id) {
    // 해당 id가 아닌 것들만 필터링해서 새 배열로 저장 => 삭제효과
    setTaskList(taskList.filter((t) => t.id !== id));
  }
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <h1 style={{ padding: "10px" }}>Todo List</h1>
      {/* 할일을 입력하는 입력창 */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="할 일을 입력하세요."
        style={{ padding: "10px", fontSize: "16px", width: "70%" }}
      />
      {/* 할일 추가 버튼 */}
      <button
        onClick={handleAdd}
        style={{ padding: "10px", marginLeft: "10px" }}>
        추가
      </button>
      {/* 할일 목록 출력 */}
      <ul
        style={{
          listStyle: "none", // 기본 ● 없앰
          padding: 0,
          marginTop: "20px",
          textAlign: "left",
        }}>
        {taskList.map(({ id, text, date, done }) => (
          <li
            style={{
              marginBottom: "12px",
              background: done ? "#d4edda" : "#f8d7da", // 완료 여부에 따라 배경색 다르게
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={id} // 리스트 항목에는 고유한 key 필요 (React가 효율적으로 렌더링하기 위해)
          >
            <div>
              {/* 완료 체크박스 - 변경 시 toggleDone 실행 */}
              <input
                type="checkbox"
                checked={done} // 완료 상태에 따라 체크 여부 결정
                onChange={() => toggleDone(id)}
                style={{ marginRight: "10px" }}
              />

              {/* 할 일 텍스트 - 완료 시 취소선 표시 */}
              <strong
                style={{
                  textDecoration: done ? "line-through" : "none",
                }}>
                {text}
              </strong>
              <br />
              {/* 등록된 날짜/시간 */}
              <small style={{ color: "#666" }}>{date}</small>
            </div>

            {/* 삭제 버튼 - 클릭 시 handleDelete 실행 */}
            <button
              onClick={() => handleDelete(id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
              }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
