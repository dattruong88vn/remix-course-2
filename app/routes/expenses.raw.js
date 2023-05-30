import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export async function loader() {
  await requireUserSession(request);
  return getExpenses();
}