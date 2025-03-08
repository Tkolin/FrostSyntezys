<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Notification;
use Illuminate\Database\Eloquent\ModelNotFoundException;

final class SetUserInNotification
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        error_log("id". $args['id']);

        if (!isset($args['id']) || !isset($args['date_end']) || !isset($args['user_id'])) {
            throw new \Exception("ID is required to update a specific notification.");
        }
        $notification_id = $args['id'];
        $date_end = $args['date_end'];
        $user_id = $args['user_id'];

        // Find the notification
        $notification = Notification::find($notification_id);

        if (!$notification) {
            throw new ModelNotFoundException("Notification with ID {$notification_id} not found.");
        }

        // Update the notification
        $notification->update([
            'date_end' => $date_end,
            'user_id' => $user_id
        ]);

        return $notification;
    }
}
