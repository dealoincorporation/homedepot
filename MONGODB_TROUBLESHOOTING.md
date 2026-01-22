# MongoDB Connection Troubleshooting

## Common Errors

### Error: IP Not Whitelisted (Most Common)
```
Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

**This means:** MongoDB Atlas is blocking your connection because your IP address isn't in the allowed list.

**Quick Fix:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **Network Access** in the left sidebar
3. Click **Add IP Address**
4. For development, you can add `0.0.0.0/0` (allows all IPs - ⚠️ only for development)
5. Or click **Add Current IP Address** to add just your current IP
6. Wait 1-2 minutes for the change to take effect

**For Production:** Only whitelist specific IPs, not `0.0.0.0/0`

---

### Error: DNS Resolution Failed
```
⨯ [Error: queryTxt ESERVFAIL hemedepot.c0whf8e.mongodb.net]
```

This is a **DNS resolution error**, meaning the hostname cannot be found.

## Possible Issues & Solutions

### 1. **Typo in Hostname** ⚠️
Your connection string shows: `hemedepot.c0whf8e.mongodb.net`

**Check if it should be:** `homedepot.c0whf8e.mongodb.net` (note: "homedepot" not "hemedepot")

**Fix:** Update your `.env.local` file:
```bash
MONGODB_URI="mongodb+srv://tajaappshop_db_user:kXMJLKisA3GrzEx2@homedepot.c0whf8e.mongodb.net/homedepot"
```

### 2. **MongoDB Cluster Doesn't Exist**
- The cluster might have been deleted
- The cluster name might be incorrect
- Check your MongoDB Atlas dashboard

**Fix:** 
1. Log into [MongoDB Atlas](https://cloud.mongodb.com)
2. Verify the cluster name matches your connection string
3. Get the correct connection string from Atlas: **Connect → Drivers → Copy connection string**

### 3. **Network/DNS Issues**
- Your network might be blocking MongoDB Atlas
- DNS resolution might be failing

**Fix:**
- Try a different network
- Check if you can ping the hostname
- Verify firewall settings

### 4. **IP Whitelist in MongoDB Atlas**
MongoDB Atlas might be blocking your IP address.

**Fix:**
1. Go to MongoDB Atlas → **Network Access**
2. Click **Add IP Address**
3. Add your current IP or use `0.0.0.0/0` for development (⚠️ not recommended for production)

### 5. **Connection String Format**
Make sure your connection string is properly formatted:

**Correct format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**Your current format (check for typos):**
```
mongodb+srv://tajaappshop_db_user:kXMJLKisA3GrzEx2@hemedepot.c0whf8e.mongodb.net/homedepot
```

## Quick Test

To test your connection string, you can run:

```bash
node -e "require('mongoose').connect('YOUR_CONNECTION_STRING').then(() => console.log('✅ Connected!')).catch(e => console.error('❌ Error:', e.message))"
```

## Next Steps

1. **Double-check the hostname** - Is it "hemedepot" or "homedepot"?
2. **Verify in MongoDB Atlas** - Does the cluster exist and is it accessible?
3. **Check IP whitelist** - Is your IP address allowed?
4. **Get fresh connection string** - Copy a new one from MongoDB Atlas

## Updated Connection String Template

After fixing, your `.env.local` should look like:

```bash
MONGODB_URI="mongodb+srv://tajaappshop_db_user:kXMJLKisA3GrzEx2@CORRECT_CLUSTER_NAME.mongodb.net/homedepot?retryWrites=true&w=majority"
JWT_SECRET="a54cb949626ef19cb6cac3cf7e4707a933866e79d3986fe8cca6164105a7aef148fe061b77c1d86b76696c4b82317515bec22015c37b2b21c0669b5c64aaf437"
ADMIN_EMAILS="admin@homedepot.ca"
```
