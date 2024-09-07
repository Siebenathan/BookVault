using BookVault.Interfaces;
using Firebase.Auth;
using Firebase.Auth.Providers;
using Firebase.Storage;
using BookVault.Utilis;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http.Features;

namespace BookVault.Services;

public class FileServiceFirebaseStorage : IFileService
{
    private readonly FirebaseSettings _firebaseSettings;
    private FirebaseAuthClient firebaseAuthClient;
    public FileServiceFirebaseStorage(IOptions<FirebaseSettings> firebaseSettings)
    {
        _firebaseSettings = firebaseSettings.Value;

        var config = new FirebaseAuthConfig
        {
            ApiKey = firebaseSettings.Value.ApiKey,
            AuthDomain = firebaseSettings.Value.AuthDomain,
            Providers = new FirebaseAuthProvider[]
            {
                new GoogleProvider().AddScopes("email"),
                new EmailProvider()
            }
        };

        firebaseAuthClient = new FirebaseAuthClient(config);
    }

    public async Task<OperationResultDTO> DeleteFile(string fileName)
    {
        UserCredential user;
        try
        {
            user = await firebaseAuthClient.SignInWithEmailAndPasswordAsync(_firebaseSettings.Email, _firebaseSettings.Password);
        }
        catch (Exception err)
        {
            return new OperationResultDTO(false, $"Error when logging into firebase auth account. Error: {err.Message}");
        }

        var task = new FirebaseStorage(_firebaseSettings.StorageBucket, new FirebaseStorageOptions
        {
            ThrowOnCancel = true,
            AuthTokenAsyncFactory = () => Task.FromResult(user.User.Credential.IdToken)
        })
        .Child("images")
        .Child("authors")
        .Child($"{fileName}.png")
        .DeleteAsync();

        try
        {
            await task;
        }
        catch (Exception err)
        {
            return new OperationResultDTO(false, "File deleted unsuccessfully.");
        }

        firebaseAuthClient.SignOut();

        return task.IsCompletedSuccessfully == true ? new OperationResultDTO(true, "File deleted successfully!")
        : new OperationResultDTO(false, "File deleted unsuccessfully.");
    }

    public async Task<(OperationResultDTO, string)> SaveFile(byte[] file, string fileName, List<string> path)
    {
        if(path.Count < 2) {
            return (new OperationResultDTO(false, "The path must have at least two values."), null);
        }

        try
        {
            var user = await firebaseAuthClient.SignInWithEmailAndPasswordAsync(_firebaseSettings.Email, _firebaseSettings.Password);

            var memoryStream = new MemoryStream(file);

            var task = new FirebaseStorage(_firebaseSettings.StorageBucket, new FirebaseStorageOptions
            {
                ThrowOnCancel = true,
                AuthTokenAsyncFactory = () => Task.FromResult(user.User.Credential.IdToken)
            })
             .Child(path[0])
             .Child(path[1])
             .Child($"{fileName}.png")
             .PutAsync(memoryStream);

            task.Progress.ProgressChanged += (s, e) => Console.WriteLine($"Progress: {e.Percentage} %");

            var downloadUrl = await task;

            firebaseAuthClient.SignOut();

            return (new OperationResultDTO(true, "Image added successfully."), downloadUrl);
        }
        catch (Exception e)
        {
            return (new OperationResultDTO(false, $"Error adding image || Error = {e.Message}"), null);
        }
    }
}