
export function CreateCourseForm({ onCancel } : {onCancel: Function}) {
    return (
        <form action="">
            <div>
                <h1>Create Course</h1>
                <button type="button" onClick={() => onCancel()}>X</button>
            </div>
            <label htmlFor="topic">Topic</label>
            <input type="text" id="topic" name="topic" placeholder="What do you want to learn?"/>
            <div>
                <p>Try to be detailed as much as possible to get better results.</p>
            </div>
            <button type="submit">Create Course</button>
            <button type="button" onClick={() => onCancel()}>Cancel</button>
        </form>
    )
}