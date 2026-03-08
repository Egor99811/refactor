import {
  Paper,
  Title,
  TextInput,
  Select,
  Button,
  Group,
  Grid,
} from "@mantine/core";
import {
  FILTER_LABELS,
  FILTERS_TYPES,
  PLACEHOLDERS,
  STATUS_OPTIONS,
} from "../../constants/orderFilters.js";
import {
  createUserOptions,
  hasActiveFilters,
} from "../../utils/components/orderFilters.js";
import { useFiltersStore } from "../../state/filtersState.jsx";
import { useUsersStore } from "../../state/usersState.jsx";

const OrderFilters = () => {
  const status = useFiltersStore((state) => state[FILTERS_TYPES.STATUS]);
  const userId = useFiltersStore((state) => state[FILTERS_TYPES.USER_ID]);
  const search = useFiltersStore((state) => state[FILTERS_TYPES.SEARCH]);
  const setFilter = useFiltersStore((state) => state.setFilter);
  const clearFilters = useFiltersStore((state) => state.clearFilters);
  const users = useUsersStore((state) => state.users);

  const handleFilterChange = (key, value) => {
    setFilter(key, value);
  };

  const userOptions = createUserOptions(users);
  const showClearButton = hasActiveFilters({ status, userId, search });

  return (
    <Paper p="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={3}>{FILTER_LABELS.TITLE}</Title>
        {showClearButton && (
          <Button variant="light" size="sm" onClick={clearFilters}>
            {FILTER_LABELS.CLEAR}
          </Button>
        )}
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput
            label={FILTER_LABELS.SEARCH}
            value={search}
            placeholder={PLACEHOLDERS.SEARCH}
            onChange={(e) =>
              handleFilterChange(FILTERS_TYPES.SEARCH, e.target.value)
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            label={FILTER_LABELS.STATUS}
            data={STATUS_OPTIONS}
            value={status}
            onChange={(value) =>
              handleFilterChange(FILTERS_TYPES.STATUS, value || "")
            }
            clearable
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            label={FILTER_LABELS.CLIENT}
            data={userOptions}
            value={userId}
            onChange={(value) =>
              handleFilterChange(FILTERS_TYPES.USER_ID, value || "")
            }
            clearable
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default OrderFilters;
