
// yyyy-mm-dd
export function getTodayForInput() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// "Due today" / "Due tomorrow"
export function formatDueDate(dateString) {
  if (!dateString) return null;

  const taskDate = new Date(dateString + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const diffDays = Math.round((taskDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { label: 'Due today', isUrgent: true };
  if (diffDays === 1) return { label: 'Due tomorrow', isUrgent: false };
  if (diffDays < 0) return { label: `Overdue`, isOverdue: true };

  // لو أكتر من يوم
  
  return {
    label: `Due ${taskDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}`,
    isUrgent: false,
  };
}