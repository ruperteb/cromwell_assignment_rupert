"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CardContent,
  Stack,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { Person, CheckCircleOutline } from "@mui/icons-material";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/lib/redux/features/users/usersApi";
import { UserUpdateFields, UpdateFormSchema } from "@/lib/definitions";
import DeleteDialog from "./deleteDialog";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  userId: number;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const router = useRouter();

  const { data } = useGetUserQuery(userId);
  const [updateProfile, updateResult] = useUpdateUserMutation();
  const [deleteProfile] = useDeleteUserMutation();

  const [form, setForm] = useState<UserUpdateFields>({
    position: "",
    mobile: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<UserUpdateFields>({
    position: "",
    mobile: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        position: data.position || "",
        mobile: data.mobile || "",
        description: data.description || "",
      });
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [event.target.id]: "",
    }));
  };

  const handleValidation = (form: UserUpdateFields) => {
    const validatedFields = UpdateFormSchema.safeParse({
      position: form.position,
      mobile: form.mobile,
      description: form.description,
    });
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      let formErrors: { [key: string]: string } = {};
      for (const [k, v] of Object.entries(fieldErrors)) {
        if (v.length > 0) {
          formErrors[k] = v[0];
        }
      }
      setFormErrors((prev) => ({ ...prev, ...formErrors }));
      return false;
    }
    setFormErrors({
      position: "",
      mobile: "",
      description: "",
    });
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = handleValidation(form);
    if (valid) {
      updateProfile({ patch: form, userId });
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleDialogConfirm = () => {
    deleteProfile(userId);
    handleDialogToggle();
    router.push("/users");
  };

  return (
    <Card
      elevation={3}
      sx={{
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <Stack direction="column" sx={{ padding: "16px 16px 10px 16px" }}>
        <Avatar sx={{ alignSelf: "center", bgcolor: "#ff5100" }}>
          <Person />
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            alignSelf: "center",
          }}
        >
          Profile
        </Typography>
      </Stack>

      <CardContent>
        <Stack direction="column" sx={{ gap: 3 }}>
          {data ? (
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              value={data.name}
              onChange={handleChange}
              disabled
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={40} />
          )}
          {data ? (
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              value={data.email}
              onChange={handleChange}
              disabled
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={40} />
          )}
          {data ? (
            <TextField
              id="role"
              label="Role"
              variant="outlined"
              size="small"
              fullWidth
              value={data.role}
              onChange={handleChange}
              disabled
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={40} />
          )}
          {data ? (
            <TextField
              id="position"
              label="Position"
              variant="outlined"
              size="small"
              fullWidth
              value={form.position}
              onChange={handleChange}
              error={!!formErrors.position}
              helperText={formErrors.position}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={40} />
          )}
          {data ? (
            <TextField
              id="mobile"
              label="Mobile No."
              variant="outlined"
              size="small"
              fullWidth
              value={form.mobile}
              onChange={handleChange}
              error={!!formErrors.mobile}
              helperText={formErrors.mobile}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={40} />
          )}
          {data ? (
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              size="small"
              fullWidth
              value={form.description}
              onChange={handleChange}
              multiline
              minRows={2}
              error={!!formErrors.description}
              helperText={formErrors.description}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={63} />
          )}
          {updateResult.isError && (
            <Typography sx={{ color: "error.main" }}>
              Error: Unable to update records
            </Typography>
          )}
          <Stack direction="row" sx={{ gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleDialogToggle}
              sx={{ height: 37 }}
              color="error"
            >
              DELETE
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ height: 37 }}
            >
              {updateResult.isLoading && (
                <CircularProgress color="inherit" size={21} />
              )}
              {updateResult.isSuccess && <CheckCircleOutline />}
              {!updateResult.isLoading && !updateResult.isSuccess && "UPDATE"}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
      <DeleteDialog
        handleClose={handleDialogToggle}
        open={dialogOpen}
        handleConfirm={handleDialogConfirm}
      />
    </Card>
  );
};

export default UserProfile;
