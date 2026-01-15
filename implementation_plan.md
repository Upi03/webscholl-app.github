# Implementation Plan - Assignment System

## Goal
Implement a new "Assignments" (Tugas) module that allows:
1.  **Students**: To view assignments and "upload" their work.
2.  **Teachers**: To view submissions and input grades.

## User Review Required
> [!NOTE]
> Since there is no backend, all data (assignments, submissions, grades) will be **local state (dummy data)** and will reset on page reload.

## Proposed Changes

### Components
#### [MODIFY] [Sidebar.tsx](file:///e:/projectweb-app/app/components/Sidebar.tsx)
- Add a new navigation item "Tugas" (`/assignments`).
- Icon: Clipboard or Book.

### Pages
#### [NEW] [app/assignments/page.tsx](file:///e:/projectweb-app/app/assignments/page.tsx)
- **Structure**:
    - Check `role` from `localStorage`.
    - Render `StudentAssignmentView` or `TeacherAssignmentView`.
- **StudentAssignmentView**:
    - Table of assignments (Subject, Title, Deadline, Status, Score).
    - "Upload" button (opens Modal).
- **TeacherAssignmentView**:
    - Table of student submissions.
    - Input field for "Nilai" (Score).
    - "Simpan" button to update local state.

## Verification Plan

### Manual Verification
1.  **Student Role**:
    - Log in as Student.
    - Click "Tugas" in Sidebar.
    - Verify list of assignments appears.
    - Click "Upload", verify modal opens.
2.  **Teacher Role**:
    - Log in as Teacher.
    - Click "Tugas" in Sidebar.
    - Verify list of student submissions appears.
    - Input a grade and click "Simpan", verify the UI updates (even if temporary).
